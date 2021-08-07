import gulp from 'gulp'
import sass from 'gulp-sass'
import csso from 'gulp-csso'
import autoprefixer from 'gulp-autoprefixer'
import del from 'del'
import sync from 'browser-sync'

export const html = () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(sync.stream())
}

export const scss = () => {
    return gulp.src('src/styles/index.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('build'))
        .pipe(sync.stream())
}

export const copy = () => {
    return gulp.src('src/img/**/*', { base: 'src' })
        .pipe(gulp.dest('build'))
        .pipe(sync.stream({ once: true }));
};

export const clear = () => {
    return del('build')
}

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'build'
        }
    });
};

export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/styles/**/*.scss', gulp.series(scss));
    gulp.watch('src/img/**/*', gulp.series(copy));
};

export const build = gulp.series(clear, html, scss, copy)

export default gulp.series(
    clear,
    gulp.parallel(
        html,
        scss,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);