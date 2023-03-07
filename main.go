package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

const portNumber = ":8081"

func main() {
	fmt.Printf("Starting application on http://localhost%s\n", portNumber)
	
	mux := http.NewServeMux()
	fileServer := http.FileServer(http.Dir("./static"))
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	mux.HandleFunc("/", Home)

	log.Fatal(http.ListenAndServe(portNumber, mux))
}

func Home(w http.ResponseWriter, req *http.Request) {
	Template(w, req, "index.html")
}

func Template(w http.ResponseWriter, req *http.Request, templateName string) error {
	parsedTemplate, err := template.ParseFiles("./" + templateName)
	if err != nil {
		return err
	}
	err = parsedTemplate.Execute(w, nil)
	if err != nil {
		return err
	}
	return nil
}
