const db = require('../db');

post = () => {
  db.Posts.bulkCreate([
    {
      title: '타이틀타아이틀',
      tag: '#아무나 #구경하러 #와바',
      content:
        '핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마컨텐트 핼레레레레레레 이쩌고 저쩌고한 그런 내용입니다하사앙ㅁ낭ㅁ나마',
    },
  ]);
};

grade = () => {
  db.UserGrade.bulkCreate([
    { explain: 'admin' },
    { explain: 'team' },
    { explain: 'normal' },
  ]);
};

categories = () => {
  db.Categories.bulkCreate([
    { explain: 'TeamStudy' },
    { explain: 'PersonStudy' },
    { explain: 'SubProject' },
  ]);
};

module.exports = {
  post,
  grade,
  categories,
};
