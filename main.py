from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import fortune  # fortune.py 모듈 불러오기

app = FastAPI()

# static 폴더 연결 (HTML, CSS, JS 제공)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    # 웹페이지 접속 시 index.html 반환
    return FileResponse("static/index.html")

@app.get("/api/fortune")
def draw_fortune():
    # 뽑기 요청 시 fortune.py의 함수 호출
    return fortune.get_random_fortune()