from app import comparator
from dotenv import load_dotenv

load_dotenv()

app = comparator()

if __name__ == "__main__":
    app.run(debug=True)