package ex.test.domain.article.controller;

import ex.test.domain.article.Request;
import ex.test.domain.article.entity.Article;
import ex.test.domain.article.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// 콘트롤러 메서드에서 return하는 값을 기본적으로 문자열로 반환함
// like @ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ApiV1ArticleController {

    private final ArticleService articleService;

    @GetMapping("")
    public List<Article> getList() {
        List<Article> articles = this.articleService.findAll();
        return articles;
    }

    @GetMapping("/{id}")
    public Article getArticle(@PathVariable(value = "id") Long id) {
        Article article = this.articleService.findById(id);
        return article;
    }

    @PostMapping("")
    public Article createArticle(@Valid @RequestBody Request.CreateRequest createRequest) {
        Article article = this.articleService.create(createRequest.getTitle(), createRequest.getContent());
        return article;
    }

    @PatchMapping("/{id}")
    public Article modifyArticle(@PathVariable(value = "id") Long id, @Valid @RequestBody Request.ModifyRequest modifyRequest) {
        Article article = this.articleService.findById(id);
        return this.articleService.modify(article,modifyRequest.getTitle(),modifyRequest.getContent());
    }

    @DeleteMapping("/{id}")
    public void removeArticle(@PathVariable(value = "id") Long id) {
        this.articleService.removeById(id);
    }



}
