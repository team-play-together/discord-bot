# Discord bot

[이전 봇 repository](https://github.com/team-play-together/together-bot)

Discord.js로 다시 개발 중인 봇.\
자세한 배경은 <https://github.com/team-play-together/together-bot/issues/81>에서 참고.

## 실행 전

### 환경 변수

`.env.example`에 필요한 환경변수들이 있음. 이걸 바탕으로 로컬에 `.env`를 추가하면 됨.

### Slash commands 등록

<https://discordjs.guide/interactions/registering-slash-commands.html>\
새로 만든 명령어는 `deploy-commands` 스크립트를 실행해서 명령어를 등록해야 함.

```sh
npm run build && node dist/deploy-commands.js
```

## 실행 방법

### NPM

```sh
npm run build
npm run start
```

### Docker

```sh
docker build --tag bot .

# Run Bot with .env file
docker run --env-file .env -it --rm bot
# Or run with `--env`
docker run -e DISCORD_BOT_TOKEN=<BOT_TOKEN> -it --rm bot
```

## 참고자료

- [An Idiot's Guide: Discord.js](https://github.com/AnIdiotsGuide/discordjs-bot-guide)
- [Discord Dev API: List of Intents](https://discord.com/developers/docs/topics/gateway#list-of-intents)
