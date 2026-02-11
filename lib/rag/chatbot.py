from pathlib import Path

from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import GPT4All
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

# Paths
BASE_DIR = Path(__file__).resolve().parent
INDEX_DIR = BASE_DIR / "mental_index"

# Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load FAISS index
db = FAISS.load_local(
    INDEX_DIR.as_posix(), embeddings, allow_dangerous_deserialization=True
)

# Local LLM optimized for faster responses
llm = GPT4All(
    model="orca-mini-3b-gguf2-q4_0.gguf",
    allow_download=True,
    verbose=False,
    n_threads=4,
    max_tokens=150,
    temp=0.7,
)

# Prompt (concise for faster responses)
prompt = ChatPromptTemplate.from_template(
    """
Context: {context}

Question: {input}

Provide a brief, supportive response (2-3 sentences) based on the context.
"""
)

# Document + LLM chain
document_chain = create_stuff_documents_chain(
    llm, prompt, output_parser=StrOutputParser()
)

# Retrieval chain (RAG) - reduced k for faster response
retrieval_chain = create_retrieval_chain(
    db.as_retriever(search_kwargs={"k": 2}), document_chain
)

print("🧠 NATIONAL MENTAL HEALTH RAG BOT READY")
print("Type exit to quit")

while True:
    q = input("\nYou: ")
    if q.lower() == "exit":
        break

    result = retrieval_chain.invoke({"input": q})
    print("\nBot:", result["answer"])
