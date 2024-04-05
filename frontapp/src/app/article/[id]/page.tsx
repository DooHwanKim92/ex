'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ArticleDetail() {

    const params = useParams()

    const router = useRouter()
    
    const [article, setArticle] = useState({})

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch(`http://localhost:8080/api/v1/articles/${params.id}`)
            .then(row => row.json())
            .then(row => setArticle(row))
    }

    const modifyClick = () => {
        clicked ? setClicked(false) : setClicked(true)
    }

    // 게시글 삭제
    const deleteArticle = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8090/api/v1/articles/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('게시물 삭제 완료.');
            router.push("/article")
        } else {
            alert('게시물 삭제 실패.');
        }

    }
    
    
    return (
        <>
            <div>번호:{article.id}</div>
            <div>제목:{article.title}</div>
            <div>내용:{article.content}</div>
            <button onClick={modifyClick}>수정</button>
            <button onClick={deleteArticle}>삭제</button>
            {clicked ? <ArticleModifyForm fetchArticle={fetchArticle}/> : null}
        </>
    )
}

function ArticleModifyForm({fetchArticle}) {

    const params = useParams()

    const [article, setArticle] = useState({title: '', content: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 기존 button의 submit 기능을 막고 아래 함수를 실행시킨다.

        const response = await fetch(`http://localhost:8080/api/v1/articles/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
            // json 객체를 문자열로 넘긴다
        });

        if (response.ok) {
            alert('게시물 수정 완료');
            fetchArticle()
            // 변경된 articleList 재정렬, Article()에서 매개변수로 받아온 함수
        } else {
            alert('게시물 수정 실패');
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>제목
                    <input type="text" name="title" value={article.title} onChange={handleChange}></input>
                </div>
                <div>내용
                    <input type="text" name="content" value={article.content} onChange={handleChange}></input>
                </div>
                <button type="submit">수정하기</button>
            </form>
        </>
    )
}