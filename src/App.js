
// import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
// import Form from './Components/Form';
// import Header from './Components/Header';
// import Todos from './Components/Todos';
// import { deleteAll } from './redux/todoapp/actions';
// import { useEffect, useState } from 'react';
// import LeftTodo from './Components/LeftTodo';

// function App() {
//   const dispatch =useDispatch();
//   const todos= useSelector((state)=>state.operationsReducer);
//   const [editFormVisibility, setEditFormVisibility] =useState(false);
//   const [editTodo, setEditTodo]= useState('');

//   const handleEditClick =(todo)=>{
//     setEditFormVisibility(true);
//     setEditTodo(todo);
//   }
//   const cancelUpdate=()=>{
//     setEditFormVisibility(false);}

//     const [isVisible, setIsVisible] = useState(true);

//        const toggleVisibility = () => {
//       setIsVisible(!isVisible);
//     };

//   return (
//  <>
//  <Header toggleVisibility={toggleVisibility} />
//     <div className=' sm:flex  justify-center sm:mx-14 mx-3 my-20'>
     
//      <div className=''>
//       <LeftTodo isVisible={isVisible}/>
//      </div>
//      <div className='w-full'>
//      <Form editFormVisibility={editFormVisibility} editTodo={editTodo}
//       cancelUpdate={cancelUpdate}/>
//       <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
//       {todos.length > 0 &&(
//       <div className='flex justify-end mt-5 w-full'>
      
//        <div>
//        <button
//       onClick={()=>dispatch(deleteAll())} 
//         className='py-2 md:text-[15px] text-[10px]   md:px-5 px-3 md:mx-10 rounded-md text-white  bg-red-500'>DELETE ALL</button>
//        </div>
   
//       </div>

//     )}
//    </div>
    
//     </div>
//     </>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Heart, Image as ImageIcon, PenTool, MessageSquare, Save, Trash2, X, Plus, Palette, ChevronRight, BookOpen, Send, Mail, Smile, Type } from 'lucide-react';

// Load Three.js from CDN
const THREE_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'valentine-diary-app';

const EMOJIS = ['❤️', '💖', '✨', '🌹', '🥰', '💍', '🧸', '🥂', '💌', '🌟', '🌈', '🍦', '🎬', '🏡', '🌍'];

// Helper to compress base64 images to stay under Firestore's 1MB limit
const compressImage = (base64Str, maxWidth = 800, maxHeight = 800) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
};

// --- 3D Heart Hero Component ---
const Hero3D = ({ onStart }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, heart;
    let frameId;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, 400);
      renderer.setPixelRatio(window.devicePixelRatio);

      const shape = new THREE.Shape();
      const x = 0, y = 0;
      shape.moveTo(x + 5, y + 5);
      shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

      const geometry = new THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 });
      const material = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 100 });
      heart = new THREE.Mesh(geometry, material);
      
      heart.rotation.x = Math.PI;
      heart.position.set(-5, 10, 0);
      scene.add(heart);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 0, 10);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      camera.position.z = 30;
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (heart) {
        heart.rotation.y += 0.01;
        heart.position.y = 10 + Math.sin(Date.now() * 0.002) * 2;
      }
      renderer.render(scene, camera);
    };

    init();
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 to-rose-50">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-black text-rose-600 mb-4 drop-shadow-xl animate-bounce">
          HeartSpace
        </h1>
        <p className="text-rose-500 text-lg md:text-2xl font-medium mb-10 max-w-lg mx-auto opacity-90">
          Our private diary of love, sketches, and whispered memories.
        </p>
        <button 
          onClick={onStart}
          className="group bg-rose-500 text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl shadow-rose-300 hover:bg-rose-600 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3 mx-auto"
        >
          Open Diary <BookOpen className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('hero'); // 'hero', 'feed', 'add', 'draw', 'invite'
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState('#ec4899');
  const [lineWidth, setLineWidth] = useState(5);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [entryText, setEntryText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = THREE_JS_URL;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'entries'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setEntries(docs);
    }, (error) => console.error("Firestore Error:", error));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (view === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 2;
      canvas.height = (window.innerHeight - 250) * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight - 250}px`;
      const context = canvas.getContext('2d');
      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = activeColor;
      context.lineWidth = lineWidth;
      contextRef.current = context;
    }
  }, [view, activeColor, lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) return;
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (nativeEvent) => {
    if (nativeEvent.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return { 
        offsetX: nativeEvent.touches[0].clientX - rect.left, 
        offsetY: nativeEvent.touches[0].clientY - rect.top 
      };
    }
    return { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
  };

  const saveEntry = async (type, content, imageUrl = null) => {
    if (!user) return;
    setIsSaving(true);
    try {
      let finalImageUrl = imageUrl;
      if (imageUrl && imageUrl.startsWith('data:image')) {
        finalImageUrl = await compressImage(imageUrl);
      }
      
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'entries'), {
        userId: user.uid,
        type,
        content,
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
      });
      setEntryText("");
      setView('feed');
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDrawing = () => {
    if (!canvasRef.current || isSaving) return;
    const dataUrl = canvasRef.current.toDataURL();
    saveEntry('drawing', 'A sketch made with love 🎨', dataUrl);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => saveEntry('image', 'A Polaroid for our collection 📸', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCopyInvite = () => {
    const url = window.location.href;
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2] font-serif text-rose-900 pb-24 relative overflow-x-hidden selection:bg-rose-200">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4">
          <div className="bg-rose-600 text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold">
            <Mail size={18} /> <span>Invitation Copied! 💌</span>
          </div>
        </div>
      )}

      {/* Diary UI Wrapper */}
      {view !== 'hero' && (
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <header className="mb-8 flex justify-between items-end border-b-2 border-rose-100 pb-4">
            <div>
              <h2 className="text-3xl font-black text-rose-600 tracking-tight">Our Diary</h2>
              <p className="text-rose-400 font-sans text-sm font-medium">Locked with love 🔒</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('invite')}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <Send size={16} /> <span className="text-sm font-bold">Send Page</span>
              </button>
            </div>
          </header>

          <main className="relative">
            {/* Diary Ring Binder Effect */}
            <div className="absolute -left-6 top-10 bottom-10 w-4 flex flex-col justify-around z-20 pointer-events-none opacity-40">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-10 h-10 border-4 border-gray-300 rounded-full -ml-5 bg-white shadow-inner" />
              ))}
            </div>

            <div className="bg-white min-h-[70vh] rounded-r-3xl rounded-l-lg shadow-2xl border-l-8 border-rose-600 p-8 relative overflow-hidden ring-1 ring-rose-100">
              {/* Paper Lines */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(#f9f9f9_1px,transparent_1px)] bg-[size:100%_2.5rem] opacity-50" />
              
              <div className="relative z-10">
                {view === 'feed' && (
                  <div className="space-y-12 pb-10">
                    {entries.length === 0 && (
                      <div className="text-center py-20 opacity-50">
                        <Heart size={48} className="mx-auto mb-4 text-rose-200" />
                        <p className="text-xl mb-6">The first page is waiting for you...</p>
                        <button 
                          onClick={() => setView('add')}
                          className="px-8 py-3 bg-rose-50 text-rose-500 rounded-full font-bold border border-rose-100 hover:bg-rose-100 transition-colors flex items-center gap-2 mx-auto"
                        >
                          <Type size={18} /> Write First Entry
                        </button>
                      </div>
                    )}
                    {entries.map((entry) => (
                      <div key={entry.id} className="relative group animate-in fade-in slide-in-from-left-4">
                        <div className="absolute -left-12 top-2 text-rose-200 font-bold rotate-[-90deg] text-[10px] uppercase tracking-widest whitespace-nowrap">
                          {entry.createdAt?.seconds ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString() : 'Now'}
                        </div>
                        
                        {entry.imageUrl && (
                          <div className="mb-4 bg-white p-3 shadow-md border border-rose-50 rotate-[-1deg] hover:rotate-0 transition-transform cursor-pointer">
                            <img src={entry.imageUrl} className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all" alt="Polaroid" />
                            <p className="mt-3 text-center text-rose-400 font-sans text-xs italic tracking-wide">
                              {entry.type === 'drawing' ? 'Our Art ❤️' : 'Taken with love ❤️'}
                            </p>
                          </div>
                        )}
                        
                        <div className="relative">
                           <p className="text-xl leading-[2.5rem] text-rose-900 font-medium whitespace-pre-wrap">
                            {entry.content}
                           </p>
                           <button 
                             onClick={() => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'entries', entry.id))}
                             className="absolute -right-4 top-0 p-2 text-rose-100 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                        <div className="mt-4 border-b border-rose-50" />
                      </div>
                    ))}
                  </div>
                )}

                {view === 'add' && (
                  <div className="animate-in slide-in-from-right-8 duration-500 pb-20">
                    <h3 className="text-2xl font-black mb-8 text-rose-500 italic underline decoration-rose-200">Dear Partner...</h3>
                    <textarea 
                      autoFocus
                      className="w-full h-[400px] bg-transparent text-2xl leading-[2.5rem] border-none outline-none resize-none placeholder-rose-200"
                      placeholder="Pour your heart out here..."
                      value={entryText}
                      onChange={(e) => setEntryText(e.target.value)}
                    />
                    
                    {/* Writing Emoji Picker */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {EMOJIS.map(e => (
                        <button 
                          key={e} 
                          onClick={() => setEntryText(prev => prev + e)}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          {e}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                       <button onClick={() => setView('feed')} className="px-6 py-3 text-rose-400 font-bold uppercase tracking-wider">Discard</button>
                       <button 
                        disabled={isSaving}
                        onClick={() => {
                          if (entryText.trim()) saveEntry('text', entryText);
                        }}
                        className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                       >
                         {isSaving ? 'Sealing...' : 'Seal Page 🔒'}
                       </button>
                    </div>
                  </div>
                )}

                {view === 'invite' && (
                  <div className="text-center py-10 animate-in zoom-in-95">
                    <div className="bg-rose-50 p-12 rounded-3xl border-2 border-dashed border-rose-200 relative">
                       <Mail size={64} className="mx-auto text-rose-400 mb-6 animate-bounce" />
                       <h3 className="text-3xl font-black mb-4">The Invitation</h3>
                       <p className="text-rose-500 text-lg mb-8 leading-relaxed">
                         Share this secret diary with your partner to start co-writing your story. 
                       </p>
                       <div className="bg-white p-4 rounded-2xl border border-rose-100 text-sm font-mono text-rose-300 break-all mb-8">
                         {window.location.href}
                       </div>
                       <button 
                        onClick={handleCopyInvite}
                        className="w-full bg-rose-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-rose-700 transition-colors flex items-center justify-center gap-3"
                       >
                         Copy Link & Send 💌
                       </button>
                       <button onClick={() => setView('feed')} className="mt-6 text-rose-400 font-bold uppercase tracking-widest text-xs">Back to Diary</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {view === 'hero' && <Hero3D onStart={() => setView('feed')} />}

      {/* Drawing View is Full Screen */}
      {view === 'draw' && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in">
           <div className="p-4 flex flex-wrap justify-between items-center border-b-4 border-rose-50 gap-4">
              <div className="flex gap-2">
                {['#ec4899', '#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#000000'].map(color => (
                  <button key={color} onClick={() => setActiveColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all ${activeColor === color ? 'border-rose-500 scale-125 shadow-md' : 'border-transparent shadow-inner'}`} style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="flex gap-4">
                {EMOJIS.slice(0, 5).map(e => (
                   <button key={e} onClick={() => {
                     if (!contextRef.current) return;
                     contextRef.current.font = "40px serif";
                     contextRef.current.fillText(e, 100, 100);
                   }} className="text-2xl hover:scale-125 transition-transform">
                     {e}
                   </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setView('feed')} className="p-2 bg-rose-50 rounded-full text-rose-400"><X size={20}/></button>
                <button 
                  disabled={isSaving}
                  onClick={handleSaveDrawing} 
                  className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold shadow-lg disabled:opacity-50 text-sm"
                >
                  {isSaving ? 'Saving...' : 'Save Art'}
                </button>
              </div>
           </div>
           <canvas
                ref={canvasRef}
                onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                className="flex-1 cursor-crosshair touch-none bg-[radial-gradient(#ffe4e6_1px,transparent_1px)] bg-[size:20px_20px]"
              />
           <div className="p-6 bg-white border-t-4 border-rose-50 flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <Palette size={20} className="text-rose-500" />
                <input type="range" min="1" max="40" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} className="flex-1 accent-rose-500 h-2 bg-rose-100 rounded-full appearance-none cursor-pointer" />
                <span className="font-bold text-rose-500 w-12 text-sm">{lineWidth}px</span>
              </div>
           </div>
        </div>
      )}

      {/* Nav Bar */}
      {view !== 'hero' && view !== 'draw' && (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[50]">
          <div className="bg-rose-900/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl flex items-center gap-10 border border-rose-800/50">
            <button onClick={() => setView('feed')} className={`group flex flex-col items-center gap-1 ${view === 'feed' ? 'text-rose-300' : 'text-rose-600'}`}>
              <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-black tracking-tighter">Wall</span>
            </button>
            <label className="group flex flex-col items-center gap-1 text-rose-600 cursor-pointer">
              <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-black tracking-tighter">Photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <button 
              onClick={() => setView('add')} 
              className={`w-16 h-16 rounded-full flex flex-col items-center justify-center -mt-12 border-4 border-[#fdf2f2] shadow-xl hover:scale-110 transition-transform active:scale-95 ${view === 'add' ? 'bg-rose-300 text-rose-900' : 'bg-rose-500 text-white'}`}
            >
              <Plus size={36} />
              <span className="text-[8px] font-bold uppercase absolute mt-12">Write</span>
            </button>
            <button onClick={() => setView('draw')} className={`group flex flex-col items-center gap-1 ${view === 'draw' ? 'text-rose-300' : 'text-rose-600'}`}>
              <PenTool size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-black tracking-tighter">Sketch</span>
            </button>
            <button onClick={() => setView('invite')} className={`group flex flex-col items-center gap-1 ${view === 'invite' ? 'text-rose-300' : 'text-rose-600'}`}>
              <Mail size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-black tracking-tighter">Invite</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}


// export default App;

