package main

import (
	"github.com/ArthurHlt/go-eureka-client/eureka"
	"fmt"
	"log"
	"net/http"
)
func main() {

	client := eureka.NewClient([]string{
		"http://127.0.0.1:8761/eureka", //From a spring boot based eureka server
		// add others servers here
	})
	instance := eureka.NewInstanceInfo("localhost", "go-example", "127.0.0.1", 10000, 1, false) //Create a new instance to register
	instance.Metadata = &eureka.MetaData{
		Map: make(map[string]string),
	}
	instance.Metadata.Map["foo"] = "bar" //add metadata for example
	client.RegisterInstance("go-example", instance) // Register new instance in your eureka(s)
	applications, _ := client.GetApplications() // Retrieves all applications from eureka server(s)
	client.GetApplication(instance.App) // retrieve the application "test"
	client.GetInstance(instance.App, instance.HostName) // retrieve the instance from "test.com" inside "test"" app
	client.SendHeartbeat(instance.App, instance.HostName) // say to eureka that your app is alive (here you must send heartbeat before 30 sec)
	fmt.Println(applications)

	handleRequests()

}


func homePage(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":10000", nil))
}


