---
title: "Minecraft Server Setup: Eine Schritt-für-Schritt Anleitung"
description: "Lerne, wie du deinen eigenen Minecraft-Server einrichtest und konfigurierst."
pubDate: 2024-10-01
slug: "minecraft-server-setup-anleitung"
headerImage: 'images/blog/effizientes-logging-paper-plugins-slf4j-log4j2-grafana-loki.jpg'
headerImageAlt: 'Minecraft Server Setup Anleitung Bild'
namespace: 'tutorial'
key: 'minecraft-server-setup'
author:
  namespace: 'author'
  key: 'themeinerlp'
schemaOrg:
  - type: "TechArticle"
    headline: "Minecraft Server Setup: Eine Schritt-für-Schritt Anleitung"
    author:
      type: "Person"
      name: "Phillipp Glanz"
    datePublished: "2024-10-01T00:00:00+00:00"
---

# Minecraft Server Setup: Eine Schritt-für-Schritt Anleitung

In diesem Tutorial zeigen wir dir, wie du deinen eigenen Minecraft-Server einrichtest und konfigurierst. Wir gehen dabei auf die wichtigsten Schritte ein, von der Installation der benötigten Software bis hin zur Konfiguration des Servers.

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass du folgende Dinge hast:

- Einen Computer mit mindestens 4GB RAM
- Eine stabile Internetverbindung
- Java 17 oder höher installiert
- Grundlegende Kenntnisse im Umgang mit der Kommandozeile

## Schritt 1: Java installieren

Stelle sicher, dass du die neueste Version von Java installiert hast. Du kannst dies überprüfen, indem du in der Kommandozeile folgenden Befehl eingibst:

```bash
java -version
```

Wenn Java nicht installiert ist oder eine ältere Version angezeigt wird, lade die neueste Version von der [offiziellen Java-Website](https://www.oracle.com/java/technologies/downloads/) herunter und installiere sie.

## Schritt 2: Server-Software herunterladen

Es gibt verschiedene Server-Softwares für Minecraft. Die beliebtesten sind:

- **Vanilla**: Die offizielle Server-Software von Mojang
- **Paper**: Eine optimierte Version des Vanilla-Servers mit vielen Verbesserungen
- **Spigot**: Eine modifizierte Version des Vanilla-Servers mit Plugin-Unterstützung

Für dieses Tutorial verwenden wir Paper, da es eine gute Balance zwischen Performance und Funktionalität bietet.

1. Besuche die [Paper-Website](https://papermc.io/downloads)
2. Lade die neueste Version herunter
3. Erstelle einen neuen Ordner für deinen Server und verschiebe die heruntergeladene JAR-Datei dorthin

## Schritt 3: Server starten

1. Öffne die Kommandozeile und navigiere zu dem Ordner, in dem du die Server-JAR-Datei gespeichert hast
2. Führe folgenden Befehl aus, um den Server zu starten:

```bash
java -Xmx2G -Xms2G -jar paper.jar nogui
```

Hierbei steht `-Xmx2G` für den maximalen RAM, den der Server nutzen darf, und `-Xms2G` für den initialen RAM. Passe diese Werte an deine Bedürfnisse an.

3. Beim ersten Start wird der Server fehlschlagen und eine Datei namens `eula.txt` erstellen. Öffne diese Datei und ändere `eula=false` zu `eula=true`, um den Minecraft-Endbenutzer-Lizenzvertrag zu akzeptieren.
4. Starte den Server erneut mit dem gleichen Befehl.

## Schritt 4: Server konfigurieren

Nach dem ersten erfolgreichen Start werden verschiedene Konfigurationsdateien erstellt. Die wichtigsten sind:

- **server.properties**: Hier kannst du grundlegende Servereinstellungen wie den Serverport, den Spielmodus und die maximale Spieleranzahl festlegen.
- **spigot.yml**: Enthält Spigot-spezifische Einstellungen.
- **paper.yml**: Enthält Paper-spezifische Einstellungen.
- **bukkit.yml**: Enthält Bukkit-spezifische Einstellungen.

Öffne die Datei `server.properties` und passe die Einstellungen nach deinen Wünschen an. Hier sind einige wichtige Einstellungen:

```properties
# Serverport (Standard: 25565)
server-port=25565

# Servername
motd=Mein Minecraft Server

# Spielmodus (survival, creative, adventure, spectator)
gamemode=survival

# Schwierigkeitsgrad (peaceful, easy, normal, hard)
difficulty=normal

# Maximale Spieleranzahl
max-players=10

# Online-Modus (true = nur Premium-Accounts, false = auch Cracked-Accounts)
online-mode=true
```

## Schritt 5: Plugins installieren (optional)

Wenn du Plugins auf deinem Server verwenden möchtest, erstelle einen Ordner namens `plugins` im Serververzeichnis. Lade die gewünschten Plugins herunter und lege sie in diesen Ordner. Starte dann den Server neu, damit die Plugins geladen werden.

## Schritt 6: Port-Weiterleitung einrichten

Damit andere Spieler auf deinen Server zugreifen können, musst du eine Port-Weiterleitung in deinem Router einrichten. Die genaue Vorgehensweise hängt von deinem Router-Modell ab, aber im Allgemeinen musst du:

1. Die IP-Adresse deines Computers herausfinden
2. Auf die Konfigurationsseite deines Routers zugreifen (meist über 192.168.0.1 oder 192.168.1.1)
3. Die Port-Weiterleitung für den Port 25565 (oder den Port, den du in server.properties festgelegt hast) zu der IP-Adresse deines Computers einrichten

## Fazit

Herzlichen Glückwunsch! Du hast erfolgreich einen Minecraft-Server eingerichtet. Deine Freunde können nun über deine öffentliche IP-Adresse und den konfigurierten Port auf deinen Server zugreifen.

Wenn du Fragen hast oder auf Probleme stößt, zögere nicht, uns zu kontaktieren oder einen Kommentar zu hinterlassen.

Viel Spaß beim Spielen!