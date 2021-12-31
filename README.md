# Discord bot

## Docker

```sh
docker build --tag bot .

# Run Bot with .env file
docker run --env-file .env -it --rm bot
# Or run with `--env`
docker run -e DISCORD_BOT_TOKEN=<BOT_TOKEN> -it --rm bot
```
