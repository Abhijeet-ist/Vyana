from pathlib import Path

import pandas as pd
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "dataset.csv"
INDEX_DIR = BASE_DIR / "mental_index"

if not DATASET_PATH.exists():
    raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")

df = pd.read_csv(DATASET_PATH)

docs = []
for _, row in df.iterrows():
    content = f"""
Platform: {row['platform']}
Country: {row['country']}
Authority: {row['authority']}
Phone: {row['phone']}
Website: {row['website']}
Description: {row['description']}
"""
    docs.append(Document(page_content=content))

splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=40)

chunks = splitter.split_documents(docs)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

INDEX_DIR.mkdir(parents=True, exist_ok=True)

db = FAISS.from_documents(chunks, embeddings)
db.save_local(INDEX_DIR.as_posix())

print("✅ Vector Index Built Successfully")
