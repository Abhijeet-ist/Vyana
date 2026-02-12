from pathlib import Path
from fastapi import FastAPI
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import GPT4All
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel

app = FastAPI(title="National Mental Health RAG API")


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

        llm = GPT4All(
            model="orca-mini-3b-gguf2-q4_0.gguf",
            allow_download=True,
            verbose=False,
            n_threads=2,
            max_tokens=150,
            temp=0.7,
        )

        print("Models loaded successfully")


prompt = ChatPromptTemplate.from_template(
    """
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
    answer = llm.invoke(formatted)

    return {
        "answer": answer.strip(),
        "disclaimer": "Informational guidance only. Not medical advice.",
    }
