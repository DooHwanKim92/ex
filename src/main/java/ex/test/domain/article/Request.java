package ex.test.domain.article;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class Request {

    @Data
    public static class CreateRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Data
    public static class ModifyRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }
}
