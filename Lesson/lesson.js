const logoutNav = document.getElementsByClassName('logout')[0]
const mainNav = document.getElementsByClassName('main')[0]
const signUpNav = document.getElementsByClassName('signup')[0]
const loginNav = document.getElementsByClassName('login')[0]
const userNav = document.getElementsByClassName('userName')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const shareNav = document.getElementsByClassName('share')[0]
const stuffNav = document.getElementsByClassName('mystuff')[0]
const accountNav = document.getElementsByClassName('myaccount')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

shareNav.addEventListener('click', function() {
    if (userName == null) {
        window.location.href = '../Login/login.html'
    }
})

stuffNav.addEventListener('click', function() {
    window.location.href = '../Mystuff/mystuff.html'
})

accountNav.addEventListener('click', function() {
    window.location.href = '../Account/account.html'
})

logoutNav.addEventListener('click', function() {
    localStorage.removeItem('Username')
    localStorage.removeItem('UserId')
    localStorage.removeItem('email')

    window.location.href = "../Lesson/lesson.html"
})

var userName = localStorage.getItem('Username')
    
if (userName != null) {
    loginNav.style.display = "none"
    signUpNav.style.display = "none"
    userNav.innerHTML = userName

    document.getElementsByClassName('div-block-3')[0].style.display = "none"
} else {
    userNav.style.display = "none"
    document.getElementsByClassName('user')[0].style.display = "none"
}

const lessonTitle = document.getElementsByClassName('text-block-14')[0]
lessonTitle.innerHTML = localStorage.getItem('title')

// Document Editor
// Change system

const content = document.getElementsByClassName('content')[0]
/*content.addEventListener('click', () => {
    content.lastChild.focus()
})*/

document.addEventListener('keydown', (e) => {
    if (e.key == "z") {
        console.log(content.children)
    }
})

var currentElem = null
var dragElem = null

function newTextArea() {
    let area = document.createElement('p')
    area.contentEditable = editable
    area.setAttribute('class', 'lesson-doc')

    if (editable) {
        area.addEventListener('click', () => {
            currentElem = area
        })

        area.addEventListener('keydown', (e) => {
            console.log('hihioirnfor')
            let childs = [...content.children]

            if (e.key == "Backspace" && childs[1] != area) {
                if (area.textContent == "") {
                    let pre = null

                    if (childs.length > 1) {
                        for (let i = 0; i < childs.length; i++) {
                            if (childs[i] == currentElem) {
                                pre = childs[i - 1]
                                break
                            }
                        }
                    }

                    content.removeChild(area)

                    currentElem = pre
                    
                    if (currentElem.textContent == "") {
                        let pre = null

                        if (childs.length > 1) {
                            for (let i = 0; i < childs.length; i++) {
                                if (childs[i] == currentElem) {
                                    pre = childs[i - 1]
                                    break
                                }
                            }
                        }

                        content.removeChild(currentElem)

                        currentElem = pre

                        if (currentElem == null) {
                            newTextArea()
                        }

                        currentElem.focus()

                        setCursor(currentElem.textContent.length);
                    }
                } else if (getCursor() == 0) {
                    let pre = null

                    if (childs.length > 1) {
                        for (let i = 0; i < childs.length; i++) {
                            if (childs[i] == currentElem) {
                                pre = childs[i - 1]
                                break
                            }
                        }
                    }

                    content.removeChild(pre)
                }
            } else if (e.key == "Backspace" && getCursor() == 0) {
                let pre = null

                if (childs.length > 1) {
                    for (let i = 0; i < childs.length; i++) {
                        if (childs[i] == currentElem) {
                            pre = childs[i - 1]
                            break
                        }
                    }
                }

                content.removeChild(area)
                currentElem = pre
                currentElem.focus()
                setCursor(currentElem.textContent.length)
            } else if (e.key == 'q' && e.ctrlKey) {
                e.preventDefault()

                removeRange()
            }
        })
    }

    let childs = [...content.children]

        if (currentElem == null || childs[childs.length - 1] == currentElem) {
            content.appendChild(area)
        } else {
            let after = null
            for (let i = 0; i < childs.length; i++) {
                if (childs[i] == currentElem) {
                    after = childs[i+1]
                    break
                }
            }

            content.insertBefore(area, after)
        }

    currentElem = area

    currentElem.focus()
}

function setCursor(pos) {
    // Creates range object
    let setpos = document.createRange();
    
    // Creates object for selection
    let set = window.getSelection();
    
    // Set start position of range
    setpos.setStart(currentElem.childNodes[0], pos);
    
    // Collapse range within its boundary points
    // Returns boolean
    setpos.collapse(true);
    
    // Remove all ranges set
    set.removeAllRanges();
    
    // Add range with respect to range object.
    set.addRange(setpos);
    
    // Set cursor on focus
    currentElem.focus();
}

function getCursor() {
    let set = window.getSelection();

    return set.getRangeAt(0).startOffset
}

function removeRange() {
    let set = window.getSelection();

    let start = set.getRangeAt(0).startOffset
    let end = set.getRangeAt(0).endOffset

    let text = ""

    for (let i = 0; i < currentElem.textContent.length; i++) {
        if (i < start || i >= end) {
            text += currentElem.textContent[i]
        }
    }

    currentElem.textContent = text
    setCursor(start)
}

function newImage(image) {
    console.log(getCursor())
    if (currentElem.textContent != "" && getCursor() != currentElem.textContent.length - 1) {
        let start = getCursor()
        removeRange()
        var firsthalf = ""
        var secondhalf = ""

        for (let i = 0; i < start; i++) {
            firsthalf += currentElem.textContent[i]
        }

        for (let i = start; i < currentElem.textContent.length; i++) {
            secondhalf += currentElem.textContent[i]
        }

        currentElem.textContent = firsthalf
    }

    try {
        if (currentElem.textContent == "") {
            let childs = [...content.children]

            let pre = null

            if (childs.length > 1) {
                for (let i = 0; i < childs.length; i++) {
                    if (childs[i] == currentElem) {
                        pre = childs[i - 1]
                        break
                    }
                }
            }

            content.removeChild(currentElem)
            currentElem = pre
        }
    } catch {

    }

    let imgContainer = document.createElement('div')
    imgContainer.setAttribute('class', 'image-layer')
    imgContainer.style.border = "1px solid #000"

    let imageHold = document.createElement('img')
    imageHold.setAttribute('src', URL.createObjectURL(image))

    imgContainer.appendChild(imageHold)

    let childs = [...content.children]

    if (currentElem == null || childs[childs.length - 1] == currentElem) {
        content.appendChild(imgContainer)
    } else {
        let after = null
        for (let i = 0; i < childs.length; i++) {
            if (childs[i] == currentElem) {
                after = childs[i+1]
                break
            }
        }

        content.insertBefore(imgContainer, after)
    }

    currentElem = imgContainer

    newTextArea()

    currentElem.textContent = secondhalf

    // Readjusting image size
    if (editable) {
        imgContainer.addEventListener('mousedown', (e) => {
            e.preventDefault()

            if (currentElem != imgContainer) {
                imgContainer.style.border = "3px solid #6d6dff"
                imgContainer.style.padding = "1px"
                currentElem = imgContainer;
            } else {
                imgContainer.style.border = "1px solid #000"
                imgContainer.style.padding = "2px"

                let childs = [...content.children]

                for (let i = 0; i < childs.length; i++) {
                    if (childs[i] == imgContainer) {
                        currentElem = childs[i+1]
                        currentElem.focus()
                        break
                    }
                }
            }

            dragElem = imgContainer
        })

        imgContainer.addEventListener('mouseup', () => {
            if (currentElem == imgContainer) {
                
            }
        })

        document.addEventListener('mouseup', () => {
            if (dragElem != null) {
                dragElem = null;
            }
        })
    }
}


// Adjusting image size

function scale(x) {
    if (dragElem && dragElem.style.borderColor == "rgb(109, 109, 255)") {
        let rect = dragElem.getBoundingClientRect()

        console.log((x - rect.left).toFixed(2) + "px")
        dragElem.style.width = (x - rect.left).toFixed(2) + "px"
        dragElem.children[0].style.width = (x - rect.left).toFixed(2) + "px"
    } else {
        return
    }
}

document.addEventListener('mousemove', (e) => {
    scale(e.clientX)
})

const edittools = document.getElementsByClassName('edit-tools')[0]
const uploadImg = document.getElementsByClassName('upload-img')[0]
var fileGet = document.getElementsByClassName('file')[0]

uploadImg.addEventListener('click', () => {
    fileGet.click()
})

fileGet.addEventListener('change', handleFile)

function handleFile() {
    let images = fileGet.files

    let inp = document.createElement('input')
    inp.value = "Click"
    inp.multiple = "multiple"
    inp.accept = "image/png, image/jpeg, image/jpg"
    inp.class = "file"
    inp.type = "file"
    inp.style.display = "none"
    inp.addEventListener('change', handleFile)
    
    edittools.removeChild(fileGet)
    edittools.insertBefore(inp, align)

    fileGet = inp

    for (let i = 0; i < images.length; i++) {
        newImage(images[i])
    }

    //content.style.height = "max(100%, fit-content)";
}

const align = document.getElementsByClassName('alignment')[0]
var alignDict = {
    '':'center',
    'self-start':'center',
    'center':'self-end',
    'self-end':'self-start'
}

align.addEventListener('click', () => {
    console.log(currentElem.style.alignSelf == '')
    currentElem.style.alignSelf = alignDict[currentElem.style.alignSelf]
    currentElem.focus()
})

const sample = document.getElementsByClassName('sample')[0]
const latex = document.getElementsByClassName('latex')[0]

latex.addEventListener('click', () => {
    /*let math = document.createElement("p")

    try{
        if (currentElem.textContent == "") {
            content.insertBefore(math, currentElem)
            currentElem.focus()
        } else {
            content.appendChild(math)
            currentElem = math
            newTextArea()
        }
    } catch {
        content.appendChild(math)
    }

    math.innerHTML = sample.innerHTML
    */
    newTextArea()

    currentElem.innerHTML = "$$   $$"
    setCursor(3)
})

// Saving and uploading to firebase
const save = document.getElementsByClassName('save')[0]

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTFcoGEb0M5kq6muwcvTVScYWwpQCmp38",
  authDomain: "lessons-1c2f7.firebaseapp.com",
  projectId: "lessons-1c2f7",
  storageBucket: "lessons-1c2f7.firebasestorage.app",
  messagingSenderId: "653725225214",
  appId: "1:653725225214:web:333d48acd88290be5e95af",
  measurementId: "G-TWN0LL7Y77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

// Setup
const lessons = collection(db, 'Lessons')
var editable = false

getDocs(lessons).then((snapShot) => {
    snapShot.docs.forEach((d) => {
        let data = d.data()

        if (data['Title'] == localStorage.getItem('title')) {
            if (data['userName'] == localStorage.getItem('Username')) {
                editable = true;
            } else {
                edittools.style.display = "none"
            }

            console.log(data['content'])

            if (data['content'].length > 0) {
                for (let ref of data['content']) {
                    // ZAWG YOU HAVE TO PATCH THIS NONSENSE
                    if (typeof ref == 'string') {
                        newTextArea()
                        currentElem.innerHTML = ref
                    } else {
                        newImage(ref)
                    }
                }
            } else {
                newTextArea()
            }
        }
    })

    if (currentElem.getAttribute('class') == 'lesson-doc') {
        setCursor(currentElem.textContent.length)
    }
})

save.addEventListener('click', () => {
    let texts = []

    for (let elem of [...content.children]) {
        if (elem.getAttribute('class') == 'lesson-doc') {
            texts.push(elem.innerHTML)
        } else {
            let srcvalue = [...elem.children][0].getAttribute('src')
            texts.push(srcvalue)
        }
    }

    console.log(texts)

    getDocs(lessons).then((snapShot) => {
        snapShot.docs.forEach((d) => {
            let data = d.data()

            if (data['Title'] == localStorage.getItem('title')) {

                updateDoc(doc(db, 'Lessons', data['Title']), {
                    'content': texts
                })

                console.log('hihi')
            }
        })
    })
})

// Error with splitting text while adding an image if the text is on multiple lines like 
// hi
// how