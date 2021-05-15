// 导入模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const bable = require('gulp-babel');
// 压缩js
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
// 发布任务
/* 测试任务
function fnTest(){
    console.log('测试');
}
*/
//将首页拷贝到dist中
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}
//压缩html
function fnHtml(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
//css
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(cssmin())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/scss'));
}
//js
function fnJs(){
    return gulp.src('./src/js/*.js')
    .pipe(bable({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}
//img
function fnImg(){
    return gulp.src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/imgs'));
}
// 监听任务
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/pages/*.html',fnHtml);
    gulp.watch('./src/sass/*.css',fnCss);
    gulp.watch('./src/js/*.js',fnJs)
}

// 导出任务模块
/*测试
exports.test = fnTest;
*/
exports.copyIndex = fnCopyIndex;
exports.html = fnHtml;
exports.scss = fnCss;
exports.js = fnJs
exports.img = fnImg
exports.default = fnWatch;