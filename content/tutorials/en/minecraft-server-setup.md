---
title: "Minecraft Server Setup: A Step-by-Step Guide"
description: "Learn how to set up and configure your own Minecraft server."
pubDate: 2024-10-01
slug: "minecraft-server-setup-guide"
headerImage: 'images/blog/effizientes-logging-paper-plugins-slf4j-log4j2-grafana-loki.jpg'
headerImageAlt: 'Minecraft Server Setup Guide Image'
namespace: 'tutorial'
key: 'minecraft-server-setup'
author:
  namespace: 'author'
  key: 'themeinerlp'
schemaOrg:
  - type: "TechArticle"
    headline: "Minecraft Server Setup: A Step-by-Step Guide"
    author:
      type: "Person"
      name: "Phillipp Glanz"
    datePublished: "2024-10-01T00:00:00+00:00"
---

# Minecraft Server Setup: A Step-by-Step Guide

In this tutorial, we'll show you how to set up and configure your own Minecraft server. We'll cover the most important steps, from installing the necessary software to configuring the server.

## Prerequisites

Before you begin, make sure you have the following:

- A computer with at least 4GB of RAM
- A stable internet connection
- Java 17 or higher installed
- Basic knowledge of using the command line

## Step 1: Install Java

Make sure you have the latest version of Java installed. You can check this by entering the following command in the command line:

```bash
java -version
```

If Java is not installed or an older version is displayed, download the latest version from the [official Java website](https://www.oracle.com/java/technologies/downloads/) and install it.

## Step 2: Download Server Software

There are various server software options for Minecraft. The most popular ones are:

- **Vanilla**: The official server software from Mojang
- **Paper**: An optimized version of the Vanilla server with many improvements
- **Spigot**: A modified version of the Vanilla server with plugin support

For this tutorial, we'll use Paper as it offers a good balance between performance and functionality.

1. Visit the [Paper website](https://papermc.io/downloads)
2. Download the latest version
3. Create a new folder for your server and move the downloaded JAR file there

## Step 3: Start the Server

1. Open the command line and navigate to the folder where you saved the server JAR file
2. Run the following command to start the server:

```bash
java -Xmx2G -Xms2G -jar paper.jar nogui
```

Here, `-Xmx2G` represents the maximum RAM the server can use, and `-Xms2G` represents the initial RAM. Adjust these values according to your needs.

3. On first start, the server will fail and create a file called `eula.txt`. Open this file and change `eula=false` to `eula=true` to accept the Minecraft End User License Agreement.
4. Restart the server with the same command.

## Step 4: Configure the Server

After the first successful start, various configuration files will be created. The most important ones are:

- **server.properties**: Here you can set basic server settings such as the server port, game mode, and maximum number of players.
- **spigot.yml**: Contains Spigot-specific settings.
- **paper.yml**: Contains Paper-specific settings.
- **bukkit.yml**: Contains Bukkit-specific settings.

Open the `server.properties` file and adjust the settings according to your preferences. Here are some important settings:

```properties
# Server port (default: 25565)
server-port=25565

# Server name
motd=My Minecraft Server

# Game mode (survival, creative, adventure, spectator)
gamemode=survival

# Difficulty level (peaceful, easy, normal, hard)
difficulty=normal

# Maximum number of players
max-players=10

# Online mode (true = only premium accounts, false = also cracked accounts)
online-mode=true
```

## Step 5: Install Plugins (optional)

If you want to use plugins on your server, create a folder called `plugins` in the server directory. Download the desired plugins and place them in this folder. Then restart the server so the plugins can be loaded.

## Step 6: Set Up Port Forwarding

For other players to access your server, you need to set up port forwarding in your router. The exact procedure depends on your router model, but generally you need to:

1. Find out the IP address of your computer
2. Access your router's configuration page (usually via 192.168.0.1 or 192.168.1.1)
3. Set up port forwarding for port 25565 (or the port you specified in server.properties) to the IP address of your computer

## Conclusion

Congratulations! You have successfully set up a Minecraft server. Your friends can now access your server via your public IP address and the configured port.

If you have questions or encounter problems, don't hesitate to contact us or leave a comment.

Have fun playing!