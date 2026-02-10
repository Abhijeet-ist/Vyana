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

# Local LLM (will auto-download if not present - ~1.8GB)
llm = GPT4All(model="orca-mini-3b-gguf2-q4_0.gguf", allow_download=True, verbose=False)

# Prompt (NATIONAL LEVEL SAFE)
prompt = ChatPromptTemplate.from_template(
    """
You are a mental health support assistant.
You ONLY provide information from official sources.
You do NOT give medical diagnosis or treatment advice.

Context:
{context}

Question:
{input}

Answer in a calm and supportive tone.
"""
)

# Document + LLM chain
document_chain = create_stuff_documents_chain(
    llm, prompt, output_parser=StrOutputParser()
)

# Retrieval chain (RAG)
retrieval_chain = create_retrieval_chain(
    db.as_retriever(search_kwargs={"k": 3}), document_chain
)

print("🧠 NATIONAL MENTAL HEALTH RAG BOT READY")
print("Type exit to quit")

while True:
    q = input("\nYou: ")
    if q.lower() == "exit":
        break

    result = retrieval_chain.invoke({"input": q})
    print("\nBot:", result["answer"])
