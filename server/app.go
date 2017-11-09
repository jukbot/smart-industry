package app

import (
	"net/http"
	"os"

	"github.com/captaincodeman/prpl-server-go"
)

func init() {
	version := os.Getenv("STATIC_VERSION")
	m, _ := prpl.New(
		prpl.WithVersion(version),
		prpl.WithRoot("./build"),
		prpl.WithConfigFile("./build/polymer.json"),
		prpl.WithRoutes(prpl.Routes{
			"/dashboard":      "src/view-dashboard.html",
			"/setup":          "src/view-setup.html",
			"/plan":           "src/view-plan.html",
			"/track":          "src/view-track.html",
			"/settings":       "src/view-settings.html",
			"/login":          "src/view-login.html",
			"/404":            "src/view-404.html",
			"/help":           "src/view-help.html",
			"/term":           "src/view-term.html",
			"/error":          "src/view-error.html",
			"/offline":        "src/view-offline.html",
			"/lazy-resources": "src/lazy-resources.html",
		}),
	)

	http.Handle("/", m)
}
