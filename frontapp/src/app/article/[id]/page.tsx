'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ArticleDetail() {

    const params = useParams()
    
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
    
    
    return (
        <>
            <div>번호:{article.id}</div>
            <div>제목:{article.title}</div>
            <div>내용:{article.content}</div>
            <button onClick={modifyClick}>수정</button>
            <button>삭제</button>
            {clicked ? <ArticleModifyForm fetchArticle={fetchArticle}/> : null}
        </>
    )
}

function ArticleModifyForm({fetchArticle}) {


    return (
        <>
            <form>
                <div>제목
                    <input type="text"></input>
                </div>
                <div>내용
                    <input type="text"></input>
                </div>
                <button>수정하기</button>
            </form>
        </>

    )
}