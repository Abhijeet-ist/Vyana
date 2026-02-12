import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel

app = FastAPI(title="National Mental Health RAG API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str


BASE_DIR = Path(__file__).resolve().parent
INDEX_DIR = BASE_DIR / "mental_index"

# GLOBAL VARIABLES (lazy load)
embeddings = None
retriever = None
llm = None


def load_models():
    global embeddings, retriever, llm

    if embeddings is None:
        print("Loading models...")

        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        db = FAISS.load_local(
            INDEX_DIR.as_posix(),
            embeddings,
            allow_dangerous_deserialization=True,
        )

        retriever = db.as_retriever(search_kwargs={"k": 2})

        # Groq API - fast cloud LLM (no local model needed)
        llm = ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=os.environ.get("GROQ_API_KEY"),
            temperature=0.7,
            max_tokens=200,
        )

        print("Models loaded successfully")


prompt = ChatPromptTemplate.from_template(
    """
You are a compassionate mental health support assistant.

Context: {context}

Question: {input}

Provide a brief, supportive response (2-3 sentences) based on the context.
"""
)


@app.post("/ask")
def ask(q: Question):
    load_models()

    docs = retriever.invoke(q.question)
    context = "\n\n".join(doc.page_content for doc in docs)

    formatted = prompt.format(context=context, input=q.question)
    response = llm.invoke(formatted)
    answer = response.content if hasattr(response, "content") else str(response)

    return {
        "answer": answer.strip(),
        "disclaimer": "Informational guidance only. Not medical advice.",
    }
