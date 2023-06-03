package middleware

import (
	"net/http"
)

type ErrorResponse struct {
	Message string `json:"message"`
}

func StandardizeResponse(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Create a custom response writer to capture the response status code
		rw := NewResponseWriter(w)

		// Execute the next handler in the chain
		next.ServeHTTP(rw, r)

		// Check the response status code
		statusCode := rw.StatusCode()

		// Set the appropriate Content-Type header
		w.Header().Set("Content-Type", "application/json")

		// Handle different status codes and format the response accordingly
		switch statusCode {
		case http.StatusOK, http.StatusCreated:
			// Do nothing for successful responses
			return
		case http.StatusUnauthorized:
			// Handle unauthorized responses
			// w.WriteHeader(statusCode)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		case http.StatusBadRequest:
			// Handle bad request responses
			// w.WriteHeader(statusCode)
			http.Error(w, "Bad Request", http.StatusBadRequest)
		case http.StatusInternalServerError:
			// Handle internal server error responses
			// w.WriteHeader(statusCode)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		default:
			// Handle any other status code
			w.WriteHeader(statusCode)
			http.Error(w, http.StatusText(statusCode), statusCode)
		}
	})
}

// ResponseWriter is a custom response writer that captures the response status code
type ResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func NewResponseWriter(w http.ResponseWriter) *ResponseWriter {
	return &ResponseWriter{ResponseWriter: w}
}

func (rw *ResponseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func (rw *ResponseWriter) StatusCode() int {
	return rw.statusCode
}
