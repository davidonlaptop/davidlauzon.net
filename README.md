# www.davidlauzon.net
This git repo hosts the source code of my blog. It is built with the [HUGO static site generator](http://gohugo.io/).


## Directory Structure
```
|-- archetypes/         # Types of contents created with `hugo new` command.
|-- config.toml         # Main HUGO Configuration
|-- content/            # Content that needs processing (eg. markdown)
|-- data/               # Other configurations files used to build the site
|-- layouts/            # Specify how content is converted into static website
|-- static/             # Content that does NOT need processing
`-- public/             # Generated website (HTML, JS, CSS, ...)
```
Note: On GitHub, the `public/` folder is found in the [`gh-pages` branch](/tree/gh-pages) instead.


## Workflow
(_based on [official tutorial](https://gohugo.io/tutorials/github-pages-blog/)_)
1. Create the Markdown source for the new post within the content/posts directory
2. Preview your work by running Hugo in server mode with hugo server
3. Run Hugo not in server mode so that the generated urls will be correct for the website
4. Add and commit the new post in master branch
5. Push the master branch
6. Push the public subtree to the remote gh-pages branch

#### Workflow Scripts
Several scripts have created to faciliate the above workflow:

| Script | Description |
| ------ | ----------- |
| [`./scripts/init.sh`](scripts/init.sh) | Initial setup |
| [`./scripts/preview.sh`](scripts/preview.sh) | Step 2 |
| [`./scripts/deploy.sh`](scripts/deploy.sh) | Steps 3-6 |


## Installing HUGO
On OSX:
```bash
brew update && brew install hugo
```
On Windows:
https://gohugo.io/tutorials/installing-on-windows/

#### Installing a theme
To install the hugo_theme_robust, do:
```bash
(cd themes && git submodule add https://github.com/dim0627/hugo_theme_robust.git)
git add .gitmodules
```
Other themes available here: http://themes.gohugo.io/

## Alternatives
List of static site generator, ranked by popularity: https://staticsitegenerators.net/


## TODO
- [ ] Add menu : About Me, Projects, Portfolio
- [ ] Remove public/ folder from master branch
- [ ] Choose a better theme
- [ ] The theme's image does not show up on github, but the blog images do.
- [ ] Remove the /asset/ prefix as the route already contains "/static/asset"
- [ ] Find a solution for [repository larger than 2GB](https://blog.bitbucket.org/2014/05/30/repository-size-limits/)