 function Sing() {
    var _this = this;
    this.member = null;
    this.els = {
        signback : document.querySelector('.signback-button'),
        signwrap : document.querySelector('.sign-area'),
        siginBtn : document.querySelector('.signin-button'),
        signupBtn : document.querySelector('.signup-button'),
        signin: document.querySelector('.sign-in-button'),
        signup: document.querySelector('.sign-up-button'),
        form : document.querySelector('#form'),
    };

    this.getForm = function(){
       var id =  _this.els.form.id.value;
       var pwd = _this.els.form.pwd.value;

       if(id !== '' && pwd !== ''){
            return { 
               'id' : id,
               'pwd' : pwd,
            }
        } else {
            return false;
        }
    };
    // get storage data
    this.getMembers = function(){
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if(key === 'diaryMembers'){
                _this.member = JSON.parse(window.localStorage.getItem(key));
                break;
            }
        }

        if(!_this.member){
            _this.member = {
                userList : [],
                sign : false,
            };
        }
    };

    this.signinCheck = function(){
        var formData = _this.getForm();
        var signs = false;
        if(formData && _this.member.userList.length > 0){
            for(var i = 0; i < _this.member.userList.length; i++){
                var id = _this.member.userList[i].id;
                var pwd = _this.member.userList[i].pwd;

                if(formData.id == id && formData.pwd == pwd ){
                    signs = true;
                    break;
                }
            }
        } 
        return signs;
    };

    this.signupCheck = function(){
        var formData = _this.getForm();
        if(formData && _this.member.userList.length > 0){
            for(var i = 0; i < _this.member.userList.length; i++){
                var id = _this.member.userList[i].id;
                if(formData.id == id){
                    return true;
                    break;
                } else {
                    return false;
                }
            }
        }
    };

    this.signin = function(){
        if(_this.signinCheck()){
            _this.member.sign = true;
            localStorage.setItem('diaryMembers', JSON.stringify(_this.member));
            location.href = 'main.html';
        } else {
            var formData = _this.getForm();
            if(!formData){
                alert('아이디와 비밀번호를 모두 입력해주세요.');
            } else {
                alert('아이디와 비밀번호가 일치하지 않습니다.')
            }
        }
    };

    this.signup = function(){
        if(_this.signupCheck()){
            alert('사용중인 아이디 입니다.')
        } else {
            var formData = _this.getForm();
            if(formData){
                _this.member.userList.push(formData);
                localStorage.setItem('diaryMembers', JSON.stringify(_this.member));
                alert('회원가입이 완료되었습니다.');
                location.reload();
            } else {
                // vaild 
                alert('아이디와 비밀번호를 모두 입력해주세요.');
            }                    
        }
    };

    this.selectForm = function(e){
        var type = e.target.value;
        if(type === 'signin'){
            _this.els.signwrap.classList.remove('signup');
            _this.els.signwrap.classList.add(type);
        } else {
            _this.els.signwrap.classList.remove('signin');
            _this.els.signwrap.classList.add(type);
        }
    }

    this.back = function(e){
        _this.els.signwrap.classList.remove('signup', 'signin');
    }

    this.session = function(){
        _this.getMembers();
        if(_this.member.sign){
            location.href = 'main.html';
        }
    }

    this.ready = function(){
        _this.session();

        // 회원가입 
        _this.els.signup.addEventListener('click',
        function() {
            _this.signup();
        });

        // 로그인
        _this.els.signin.addEventListener('click',
        function() {
            _this.signin();
        });

        _this.els.siginBtn.addEventListener('click',
        function(e) {
           _this.selectForm(e);
        });

        _this.els.signupBtn.addEventListener('click',
        function(e) {
           _this.selectForm(e);
        });

        _this.els.signback.addEventListener('click',
        function() {
           _this.back();
        });
    }
    document.addEventListener('DOMContentLoaded', _this.ready);
}
