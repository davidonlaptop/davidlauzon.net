---
title: Capistrano 2 Recipe for Dreamhost Shared Hosting and mod_rails
author: David On Laptop
layout: post
date: 2008-06-30T12:30:37+00:00
url: /2008/06/capistrano-2-recipe-for-dreamhost-shared-hosting-and-mod_rails/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos
tags:
  - capistrano
  - dreamhost
  - ruby on rails
  - svn

---
## Introduction

I could not find an updated documentation on how to setup properly a rails application on Dreamhost, so I thought I&#8217;d share the information I gathered.. First off, thanks to the Phusion team, with <a href="http://www.modrails.com/" target="_blank">Passenger (a.k.a. mod_rails)</a>, it&#8217;s now very convenient, easy, and cheap to run a rails application on Dreamhost.

Also, special thanks to <a href="http://gabrito.com/" target="_blank">Todd Huss</a> for discovering the <a href="http://gabrito.com/post/ruby-on-rails-dreamhost-plugin" target="_blank">multi dreamhost user hack</a>. Basically, you need to run each of your rails application on Dreamhost under a different shell user. Their process monitor, will start killing your processes when the total memory per user exceeds 200 MB of virtual memory (VSZ).

So here&#8217;s the guide, even perfect newbees and skript-kiddies should be able to follow :

## The complete step by step

**INFO** : Let Capistrano create the directory structure on the server BEFORE you set the public dir of your application in the edit domain section of the Control Panel. This will avoid you conflicts when Capistrano attemps to create the symlinks.

1. First, configure your new rails application using Dreamhost Control Panel : 
    1. Create a new repository for your application ([screenshot][1])
    2. Create a new shell / SSH user (read why <a href="http://gabrito.com/post/ruby-on-rails-dreamhost-plugin" target="_blank">here</a>) with the same name as your application ([screenshot][2])
    3. Create a new database ([screenshot][3])
    
    
2. Add your application to your repository 
    1. Create your rails skeleton (if it&#8217;s done yet), on your local machine (assuming you use *nix, but should be similar on Windows)
         ```bash
         rails myrailsapp --freeze
         ```
        
    2. Add your application to the repository 
        ```bash
        $ cd myrailsapp
        $ svn mkdir http://svn.myrailsappdomain/myrails/trunk
        $ svn checkout http://svn.myrailsappdomain/myrails/trunk ./
        $ svn add  *
        $ svn commit
        ```

    3. Exclude database configuration, temporary files, and any user upload directory from the source control : 
        ```bash
        $ svn copy config/database.yml config/database.yml.example
        $ svn remove config/database.yml -f
        $ svn propset svn:ignore "database.yml" config/
        $ svn remove tmp/*
        $ svn propset svn:ignore "*" tmp/
        # If you need to share unversionned user-uploaded files, between deploys :
        $ mkdir public/uploads
        $ svn add public/uploads
        $ svn propset svn:ignore "*" public/uploads/
        $ svn remove log/*
        $ svn propset svn:ignore "*" log/
        $ svn remove db/*.sqlite3
        $ svn propset svn:ignore "*.sqlite3" db/
        $ svn commit
        ```

3. Next, create the Capistrano recipe : 
    1. Create recipe skeleton :
        ```bash
        $ cd /path/to/your/myrailsapp
        $ capify .
        [add] writing `./Capfile'
        [add] writing `./config/deploy.rb'
        [done] capified!
        ```

    2. Replace the content of `config/deploy.rb` with the following :
        ```ruby
        #############################################################
        ## General
        #############################################################

        set :application, "myrailsapp"
        #############################################################
        ## Servers
        #############################################################
        set :use_sudo, false    # Dreamhost does not support sudo
        set :user, application  # Dreamhost SSH User
        set :domain, "myrailsapp.domain.com"

        server domain, :app, :web
        role :db, domain, :primary =&gt; true

        #############################################################
        ## Subversion
        #############################################################
        set :scm, :subversion
        set :scm_user, application   # Sets 'my_svn_user' instead, if you are using different name than your app.
        set :scm_auth_cache, true  # Prompts for password once
        set :scm_password, Proc.new { Capistrano::CLI.password_prompt("SCM password for #{scm_user}:") }
        set :repository,  "http://svn.myrailsappdomain/#{application}/trunk"
        set :deploy_to, "/home/#{user}/#{domain}"
        # keeps a local checkout of the repository on the server to get faster deployments
        set :deploy_via, :remote_cache

        #############################################################
        ## Tasks
        #############################################################

        namespace :deploy do
          desc "Restart Application (using tmp/restart.txt)"
          task :restart_passenger do
            run "touch #{current_path}/tmp/restart.txt"
          end

          desc "Restarts your application."
          task :restart do
            restart_passenger
          end

          desc "Link shared files"
          before :symlink do
            run "rm -drf #{release_path}/public/uploads"
            run "ln -s #{shared_path}/uploads #{release_path}/public/uploads"
            run "rm -f #{release_path}/config/database.yml"
            run "ln -s #{shared_path}/database.yml #{release_path}/config/database.yml"
          end
        end
        ```
    
4. Then, prepare the directory structure on the server : 
    1. Create the Capistrano structure (releases/, shared/), by typing this on your local machine :
        ```bash
        $ cap deploy:setup
        ```

    2. Login to your server to manually create your shared directories and files (if any)
        ```bash
        $ ssh myrailsapp.domain.com
        [tootsie]$ cd myrailsapp/shared
        ```

    3. Configure your database on the server (you don&#8217;t want this file in your repository) :
        ```yaml
        # config/database.yml

        development:
          adapter: sqlite3
          database: db/development.sqlite3
          timeout: 5000

        test:
          adapter: sqlite3
          database: db/test.sqlite3
          timeout: 5000

        production:
          adapter: mysql
          encoding: utf8
          database: myrailsapp
          username: myrailsapp
          password: [your_db_password]
          host: mysql.[myrailsapp.domain].com
          timeout: 5000
        ```
        
    4. Create your upload directory (OPTIONAL) :
        ```bash
        [tootsie]$ mkdir uploads
        ```
    
5. Deploy your application. Note : it will only prompt for your SVN password at the first deploy.
    ```bash
    $ cap deploy
    ```

6. And finally the most important, configure your domain like this : <img src="/asset/2008/6/30/dreamhost_edit_rails_domain.jpg" width="500" height="354" />

    
## [UPDATE 2008/07/01]
    
If you need to install custom gems on your account, you can find more info <a title="Dreamhost Wiki : Installing your own gems and RubyGems" href="http://wiki.dreamhost.com/index.php/RubyGems" target="_blank">here</a>, <a title="installing your own packages and gems" href="http://nateclark.com/articles/2006/10/20/dreamhost-your-own-packages-and-gems" target="_blank">here</a> and <a href="http://rails.dreamhosters.com/" target="_blank">here</a>.
    
## References
    
1. http://labs.peritor.com/webistrano/wiki/ConfigurationParameter
2. [http://groups.google.ca/group/capistrano/browse\_thread/thread/6ef7c7c212547eab (for scm\_password)][4]
3. [http://groups.google.com/group/capistrano/browse_thread/thread/ae7b16a16abf4e5d (for task hookups with namespaces)][5]
4. <http://groups.google.com/group/capistrano/web/deploying-on-dreamhost>
5. <http://gabrito.com/post/ruby-on-rails-dreamhost-plugin>
6. <http://www.railsforum.com/viewtopic.php?id=8118>
7. [Dreamhost Wiki : Capistrano][6]
8. [Dreamhost Wiki : Ruby on Rails][7]
9. [Capistrano Manual][8]

 [1]: /asset/2008/6/30/dreamhost_create_repository.jpg
 [2]: /asset/2008/6/30/dreamhost_create_user.jpg
 [3]: /asset/2008/6/30/dreamhost_create_database.jpg
 [4]: http://groups.google.ca/group/capistrano/browse_thread/thread/6ef7c7c212547eab
 [5]: http://groups.google.com/group/capistrano/browse_thread/thread/ae7b16a16abf4e5d
 [6]: http://wiki.dreamhost.com/Capistrano
 [7]: http://wiki.dreamhost.com/Ruby_on_Rails
 [8]: http://manuals.rubyonrails.com/read/chapter/97
