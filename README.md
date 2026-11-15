# beep-teacher-aid

교사 웹(`beep-teacher-web`)을 `@b1nd/aid-kit` 웹뷰 앱으로 이식한 프로젝트입니다.

## 개발

```bash
pnpm install   # 또는 npm install
cp .env.example .env
pnpm dev
```

`.env.example`의 `VITE_API_BASE_URL`은 개발 API(`https://api.dev.8beep.site/`)입니다.

## 릴리즈 (`dist.zip`)

S3 배포기는 ZIP의 첫 항목 위치를 루트로 보거나 `assets/` 디렉터리 엔트리가 필요할 수 있습니다. `npm run pack:dist`는 beep-aid 릴리즈와 같은 레이아웃으로 `dist.zip`을 만듭니다.

- 첫 항목은 항상 `index.html`
- `assets/` 디렉터리 엔트리 뒤에 에셋 파일
- 경로는 상대 경로만 (`dist/` 접두사와 `./` 없음)
- `__MACOSX`, `.DS_Store` 제외

`dist.zip`은 git에 커밋하지 않습니다.

```bash
# 운영 API, 목업 사용자 비활성
# VITE_API_BASE_URL=https://api.8beep.site/
# VITE_USE_MOCK_USER=false

pnpm build          # 또는 npm run build
pnpm pack:dist      # 또는 npm run pack:dist
# 한 번에: npm run release:zip

unzip -l dist.zip   # index.html이 첫 항목인지, assets/ 디렉터리가 있는지 확인

gh release create vX.Y.Z-temp dist.zip \
  --target <commit-sha> \
  --title "Beep Teacher AID temporary release vX.Y.Z" \
  --notes-file <notes.md>
```

환경 변수를 바꿔 다른 산출 경로에 만들 수도 있습니다.

```bash
DIST_DIR=/path/to/dist OUT=/path/to/dist.zip npm run pack:dist
```
