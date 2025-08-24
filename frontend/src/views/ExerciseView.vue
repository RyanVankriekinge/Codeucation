<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>{{ title }}</h1>
            <h2>{{ course?.title }}: {{ chapter?.title }}</h2>

            <label class="paragraph" for="exerciseSelect">Huidige oefening: </label>
            <div class="custom-select">
              <select v-model="currentExerciseId" id="exerciseSelect" class="paragraph" @focus="isOpen = true"
                @blur="isOpen = false">
                <option v-for="exercise in exercises" :key="exercise._id" :value="exercise._id">
                  {{ exercise.title }}
                </option>
              </select>
              <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 44.047 23.523">
                <path d="M6,13.5,25.9,33.4,45.8,13.5" transform="translate(-3.879 -11.379)" fill="none" stroke="#FFFFFF"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 44.047 23.523">
                <path d="M6,33.4,25.9,13.5,45.8,33.4" transform="translate(-3.879 -12)" fill="none" stroke="#FFFFFF"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
              </svg>
            </div>
            <div class="paragraph" style="margin-bottom: 15px;" v-html="instruction"></div>

            <div ref="editorContainer" class="code-editor"></div><br>

            <button @click="checkCode" class="big-button">Code testen</button>
            <pre
              style="font-family: Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;">{{ result }}</pre>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { python } from '@codemirror/lang-python'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { oneDark } from '@codemirror/theme-one-dark'

const route = useRoute()
const router = useRouter()

const course = ref(null)
const chapter = ref(null)
const exercises = ref([])
const currentExerciseId = ref(route.params.exerciseId)
const currentExercise = ref(null)

const title = ref('')
const instruction = ref('')
const codeArea = ref('')
const result = ref('')

const editorContainer = ref(null)
let editorView = null

const isOpen = ref(false)

const loadChapter = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/chapters/${route.params.chapterId}`)
    if (!res.ok) throw new Error('Failed to load chapter')
    chapter.value = await res.json()
  } catch (err) {
    console.error('Failed to load chapter:', err)
  }
}

const loadCourse = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/courses/${route.params.courseId}`)
    if (!res.ok) throw new Error('Failed to load course')
    course.value = await res.json()
  } catch (err) {
    console.error('Failed to load course:', err)
  }
}

const loadExercises = async () => {
  try {
    const chapterId = route.params.chapterId
    const res = await fetch(`http://localhost:3000/api/exercises/chapter/${chapterId}`)
    if (!res.ok) throw new Error('Failed to load exercises')
    exercises.value = await res.json()
    if (!currentExerciseId.value && exercises.value.length) {
      currentExerciseId.value = exercises.value[0]._id
    }
  } catch (err) {
    console.error('Failed to load exercises:', err)
  }
}

const loadExercise = async (exerciseId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`)
    if (!res.ok) throw new Error('Exercise not found')
    const data = await res.json()
    currentExercise.value = data
    title.value = data.title || ''
    instruction.value = data.instruction || ''
    codeArea.value = data.starterCode || ''
    result.value = ''

    if (editorView) {
      const state = EditorState.create({
        doc: codeArea.value,
        extensions: [
          python(),
          oneDark,
          keymap.of([indentWithTab, ...defaultKeymap]),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              codeArea.value = update.state.doc.toString()
            }
          })
        ]
      })
      editorView.setState(state)
    }
  } catch (err) {
    console.error('Failed to load exercise:', err)
    title.value = 'Geen oefening geselecteerd'
    instruction.value = ''
    codeArea.value = ''
    result.value = ''
  }
}

watch(currentExerciseId, (newId) => {
  if (newId) {
    loadExercise(newId)
    router.replace({
      name: 'exercise',
      params: {
        courseId: route.params.courseId,
        chapterId: route.params.chapterId,
        exerciseId: newId
      }
    })
  }
})

onMounted(async () => {
  await loadExercises()
  await loadChapter()
  await loadCourse()
  if (currentExerciseId.value) {
    loadExercise(currentExerciseId.value)
  }

  if (editorContainer.value) {
    const state = EditorState.create({
      doc: codeArea.value,
      extensions: [
        python(),
        oneDark,
        keymap.of([indentWithTab, ...defaultKeymap]),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            codeArea.value = update.state.doc.toString()
          }
        })
      ]
    })
    editorView = new EditorView({
      state,
      parent: editorContainer.value
    })
  }
})

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const ensureSkulptLoaded = async () => {
  if (typeof window.Sk === 'undefined') {
    await loadScript('https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js')
    await loadScript('https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.min.js')
  }
}

const checkCode = async () => {
  result.value = ''

  if (!currentExercise.value) return

  await ensureSkulptLoaded()

  let capturedOutput = ''
  Sk.configure({
    output: (text) => (capturedOutput += text),
    read: (x) => {
      if (!Sk.builtinFiles || !Sk.builtinFiles['files'][x]) throw `File not found: '${x}'`
      return Sk.builtinFiles['files'][x]
    },
  })

  try {
    const userCode = codeArea.value
    const validationRes = await fetch(
      `http://localhost:3000/api/exerciseValidationCode/${encodeURIComponent(currentExercise.value.testFile)}`
    )

    if (!validationRes.ok) {
      const validationData = await validationRes.json()
      throw new Error(validationData.message || 'Failed to fetch validation code')
    }

    const validationData = await validationRes.json()
    const fullCode = userCode + '\n' + validationData.code
    console.log(fullCode)

    await Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, fullCode)
    );

    let feedback;
    try {
      feedback = JSON.parse(capturedOutput.trim());
    } catch (e) {
      console.log("Validation function does not return valid JSON");
    }
    console.log(feedback.status);
    result.value = feedback.message;
    await fetch('http://localhost:3000/api/exercise-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        exerciseId: currentExercise.value._id,
        status: feedback.status,
        lastOutput: feedback.output
      })
    })

  } catch (err) {
    console.error('Skulpt error:', err)

    if (err instanceof Sk.builtin.SyntaxError) {
      result.value = "SyntaxError: " + Sk.ffi.remapToJs(err.args.v[0]) + ` on line ${err.traceback[0].lineno}`;
    } else if (err instanceof Sk.builtin.ValueError || err instanceof Sk.builtin.TypeError) {
      result.value = err.tp$name + ": " + Sk.ffi.remapToJs(err.args.v[0]) + ` on line ${err.traceback[0].lineno}`;
    } else {
      result.value = err.toString();
    }

    // if (err && err.traceback) {
    //   for (const tb of err.traceback) {
    //     result.value += `line ${tb.lineno}\n`;
    //   }
    // } else {
    //   result.value = 'Error:\n' + err.toString()
    // }
  }
}

</script>