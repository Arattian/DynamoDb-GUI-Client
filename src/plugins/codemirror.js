import Vue from 'vue';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/lint/json-lint.js';
import'codemirror/addon/selection/active-line.js'
import'codemirror/addon/selection/mark-selection.js'
import'codemirror/addon/hint/show-hint.js'
import'codemirror/addon/hint/show-hint.css'
import'codemirror/addon/hint/javascript-hint.js'
import'codemirror/addon/scroll/annotatescrollbar.js'
import'codemirror/addon/search/matchesonscrollbar.js'
import'codemirror/addon/search/searchcursor.js'
import'codemirror/addon/search/match-highlighter.js'
import'codemirror/keymap/sublime.js'
import'codemirror/addon/fold/foldgutter.css'
import'codemirror/addon/fold/brace-fold.js'
import'codemirror/addon/fold/comment-fold.js'
import'codemirror/addon/fold/foldcode.js'
import'codemirror/addon/fold/foldgutter.js'

Vue.use(VueCodemirror, {
    options: {
        lint: true,
        theme: 'panda-syntax',
        tabSize: 4,
        mode: {
            name: 'javascript',
            json: true
        },
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        hintOptions:{
            completeSingle: false
        },
        autofocus: true,
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        styleActiveLine: true,
        matchBrackets: true,
    }
})