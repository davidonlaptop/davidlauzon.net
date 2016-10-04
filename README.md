# www.davidlauzon.net
This git repo hosts the source code of my blog. It is built with the [HUGO static site generator](http://gohugo.io/).

## Directory Structure
```
|-- archetypes/         # Types of contents created with `hugo new` command.
|-- config.toml         # Main HUGO Configuration
|-- content/            # Website content in markup language (eg. markdown,etc)
|-- data/               # Other configurations files used to build the site
|-- layouts/            # Specify how content is converted into static website
`-- static/             # Generated website (HTML,JS,CSS)
```
Note: On GitHub, the `static/` folder is found in the [`gh-pages` branch](/tree/gh-pages) instead.


## Workflow
(_based on [official tutorial](https://gohugo.io/tutorials/github-pages-blog/)_)
1. Create the Markdown source for the new post within the content/posts directory
2. Preview your work by running Hugo in server mode with hugo server
3. Run Hugo not in server mode so that the generated urls will be correct for the website
4. Add and commit the new post in master branch
5. Push the master branch
6. Push the public subtree to the remote gh-pages branch


## Installing HUGO
### OSX
```bash
brew update && brew install hugo
```
