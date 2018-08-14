# Make Tech Blog

스터디한 자료들, 스터디 과정, 모듈만드는 과정 등 정보공유를 위한 기술블로그



## config 폴더는 초기 세팅을 위해 배포

초기 1 회 이후 ignore 에 추가하여 추가적으로 배포하지 않습니다. password 가 들어가기때문에 주의해주세요..



## 실행방법

npm i 또는 yarn install
config/config.json 에 각자 db 셋팅해주세요
npm start 또는 yarn start



## 개선해주세요

더 좋은 방법이 있다면 바로 개선해주세요!!~!!



## DB Sync

/src/bin/syncDB 에 DB Sync 내용이 있습니다.
force:true 설정시 테이블이 재건축되어 데이터가 날라갑니다. 관계 재설정이나 재건축이 필요한경우에만 사용하세요!



## Seqeulize Docs

Docs 양이 적습니다.!!
<http://docs.sequelizejs.com/>



## prettierrc

eslint 와 연동하지는 않았습니다.
