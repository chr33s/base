# Base

> [client, server] starter

## Notes

0. !monorepo simplicity (+microservice/apps)
1. consistent editor across team (.editorconfig) # tabs for accessibility
2. pinned npm package versions (.npmrc)
3. twelve-factor app (.env)
4. checks [lint,format](css, ts, actions, docker)
5. tests [unit, e2e]
6. sentry (catch bugs)
7. gitops (.github/\*)
8. security (public/\*.txt) & fail-closed
9. typescript || typescript.js-doc (if !team support)
10. Dockerfile (~deterministic builds)
11. Documentation as code [package.scripts, name()]
12. Component driven UI [ladle/stories]
