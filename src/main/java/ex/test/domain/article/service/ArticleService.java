package ex.test.domain.article.service;


import ex.test.domain.article.entity.Article;
import ex.test.domain.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    public List<Article> findAll() {
        return this.articleRepository.findAll();
    }

    public Article create(String title, String content) {

        Article article = Article.builder()
                .title(title)
                .content(content)
                .build();

        this.articleRepository.save(article);

        return article;
    }

    public Article findById(Long id) {
        Optional<Article> article = this.articleRepository.findById(id);
        if(article.isEmpty()) {
            return null;
        }
        return article.get();
    }

    public Article modify(Article article, String title, String content) {

        Article modifyA = article.toBuilder()
                .title(title)
                .content(content)
                .build();

        this.articleRepository.save(modifyA);

        return modifyA;
    }

    public void removeById(Long id) {
        this.articleRepository.deleteById(id);
    }
}
