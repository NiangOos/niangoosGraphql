package main

import (
	"html/template"
	"log"
	"net/http"
)

var Handlers = struct {
	Port string
}{
	Port: ":8080",
}

func main() {
	http.HandleFunc("/", IndexHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	log.Println("Server started and listening on port", Handlers.Port)
	log.Println("http://localhost" + Handlers.Port)
	log.Fatal(http.ListenAndServe(Handlers.Port, nil))
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	RenderTemplate(w, "index", nil)
}

// Load HTML templates
var templates = template.Must(template.ParseGlob("./*.html"))

func RenderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	htmlFile := tmpl + ".html"
	err := templates.ExecuteTemplate(w, htmlFile, data)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		log.Println("Internal Server Error:", err)
	}
}
