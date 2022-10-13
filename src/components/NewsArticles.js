import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions/NewsActions";

const NewsArticles = (props) => {

  const dispatch = useDispatch();

  const appState = useSelector((state) => {
    return {
      news: state.news.news
    }
  });

  let articles = appState.news.newsArticles.map((article) => {

    return (
      < tr key={article.id} >
        <td> {(article.date)}</td>
        <td> {article.header} </td>
        <td> {article.content}</td>
      </tr >
    )
  })

  return (

    <table className="table table-striped">
      <thead>
        <tr>
          <th>Päivämäärä</th>
          <th>Otsikko</th>
          <th>Sisältö</th>

        </tr>
      </thead>
      <tbody>
        {articles}
      </tbody>
    </table>
  )
}

export default NewsArticles;
