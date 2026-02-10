from fastapi import FastAPI
from pydantic import BaseModel
from pathlib import Path

from langchain.chains import RetrievalQA
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import GPT4All
from langchain_community.vectorstores import FAISS

app = FastAPI(title="National Mental Health RAG API")


class Question(BaseModel):
    question: str


BASE_DIR = Path(__file__).resolve().parent
INDEX_DIR = BASE_DIR / "mental_index"

# Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load FAISS
db = FAISS.load_local(
    INDEX_DIR.as_posix(), embeddings, allow_dangerous_deserialization=True
)

# Local LLM
llm = GPT4All(model="ggml-gpt4all-j-v1.3-groovy", verbose=False)

qa = RetrievalQA.from_chain_type(
    llm=llm, retriever=db.as_retriever(search_kwargs={"k": 3}), chain_type="stuff"
)


@app.post("/ask")
def ask(q: Question):
    answer = qa.run(q.question)
    return {
        "answer": answer,
        "disclaimer": "Informational guidance only. Not medical advice.",
    }
