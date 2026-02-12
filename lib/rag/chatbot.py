import os
from pathlib import Path

from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

# Paths
BASE_DIR = Path(__file__).resolve().parent
INDEX_DIR = BASE_DIR / "mental_index"

# Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load FAISS index
db = FAISS.load_local(
    INDEX_DIR.as_posix(), embeddings, allow_dangerous_deserialization=True
)

# Groq API - fast cloud LLM (no local model needed)
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.environ.get("GROQ_API_KEY"),
    temperature=0.7,
    max_tokens=200,
)

# Prompt (concise for faster responses)
prompt = ChatPromptTemplate.from_template(
    """
You are a compassionate mental health support assistant.

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
