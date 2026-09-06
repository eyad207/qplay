export interface Question {
  id: number;
  question: string;
  image?: string;
  options: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
  };
  correctAnswer: "red" | "blue" | "green" | "yellow";
  timeLimit: number; // seconds
}

export const questions: Question[] = [
  {
    id: 1,
    question: "ما هو الإنترنت؟",
    options: {
      red: "شبكة تربط الأجهزة والناس",
      blue: "لعبة فقط",
      green: "كتاب ورقي",
      yellow: "آلة تصوير",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 2,
    question: "ما فائدة الإنترنت؟",
    options: {
      red: "منع التواصل",
      blue: "التواصل والوصول إلى المعلومات",
      green: "إيقاف التعليم",
      yellow: "حذف الملفات دائمًا",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "ما الصفة المهمة لكلمة المرور القوية؟",
    options: {
      red: "أن تكون اسمك فقط",
      blue: "أن تكون قصيرة جدًا",
      green: "أن تحتوي على حروف وأرقام ورموز",
      yellow: "أن تكون كلمة واحدة سهلة",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 4,
    question: "هل من الجيد استخدام كلمة المرور نفسها لكل الحسابات؟",
    options: {
      red: "نعم، دائمًا",
      blue: "لا، من الأفضل استخدام كلمات مرور مختلفة",
      green: "نعم، إذا كانت قصيرة",
      yellow: "لا نحتاج إلى كلمات مرور",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 5,
    question: "ماذا تعني المصادقة الثنائية (2FA)؟",
    options: {
      red: "استخدام حسابين فقط",
      blue: "كتابة كلمة المرور مرة واحدة",
      green: "كتابة كلمة المرور مرتين",
      yellow: "استخدام طريقتين للتأكد من هوية المستخدم",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
  {
    id: 6,
    question: "هل هذه رسالة احتيالية؟",
    image: "/img1_false.png",
    options: {
      red: "نعم، إنها احتيالية",
      blue: "لا، إنها حقيقية",
      green: "إنها رسالة مدرسية",
      yellow: "لا يمكن معرفة ذلك",
    },
    correctAnswer: "blue",
    timeLimit: 40,
  },
  {
    id: 7,
    question: "هل هذه رسالة حقيقية؟",
    image: "/img2_false.png",
    options: {
      red: "إنها رسالة مدرسية",
      blue: "نعم، تبدو رسالة حقيقية",
      green: "لا، إنها احتيالية",
      yellow: "لا يمكن قراءة الرسالة",
    },
    correctAnswer: "blue",
    timeLimit: 40,
  },
  {
    id: 8,
    question: "هل هذه رسالة احتيالية؟",
    image: "/img3_true.png",
    options: {
      red: "إنها رسالة مدرسية",
      blue: "لا، إنها حقيقية",
      green: "نعم، إنها احتيالية",
      yellow: "لا يمكن معرفة ذلك",
    },
    correctAnswer: "green",
    timeLimit: 40,
  },
  {
    id: 9,
    question: "هل رمز QR آمن دائمًا؟",
    options: {
      red: "نعم، دائمًا",
      blue: "لا، يجب التأكد من مصدره أولًا",
      green: "نعم، إذا كان ملونًا",
      yellow: "لا يمكن أن يحتوي على رابط",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 10,
    question: "ماذا تفعل إذا ضغطت بالخطأ على رابط مشبوه؟",
    options: {
      red: "تدخل كلمة المرور",
      blue: "تغلق الصفحة ولا تدخل أي معلومات",
      green: "ترسل الرابط لأصدقائك",
      yellow: "تدفع المال فورًا",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 11,
    question: "ما هو الذكاء الاصطناعي؟",
    options: {
      red: "جهاز لا يعمل إلا دون إنترنت",
      blue: "نوع من كلمات المرور",
      green: "رابط إلكتروني فقط",
      yellow: "تقنية تساعد الأجهزة على أداء مهام ذكية",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
  {
    id: 12,
    image: "/img4_true.png",
    question: "هل هذه رسالة احتيالية؟",
    options: {
      red: "إنها رسالة مدرسية",
      blue: "لا، إنها حقيقية",
      green: "لا يمكن معرفة ذلك",
      yellow: "نعم، إنها احتيالية",
    },
    correctAnswer: "yellow",
    timeLimit: 40,
  },
  {
    id: 13,
    question: "ما العلامة التي قد تدل على أن الرسالة احتيالية؟",
    options: {
      red: "تحتوي على تحية عادية",
      blue: "تطلب التصرف بسرعة أو تخويفك",
      green: "تصل في وقت مناسب",
      yellow: "تحتوي على اسمك فقط",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 14,
    question: "ماذا يجب أن تفعل قبل الضغط على رابط في رسالة؟",
    options: {
      red: "تدخل كلمة المرور أولًا",
      blue: "تضغط عليه بسرعة",
      green: "تتأكد من مصدر الرابط",
      yellow: "ترسله إلى أصدقائك",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  
  {
    id: 15,
    question: "ماذا يمكن أن تطلب منك رسالة QR احتيالية؟",
    options: {
      red: "إغلاق الهاتف دائمًا",
      blue: "رسم صورة فقط",
      green: "قراءة كتاب",
      yellow: "تسجيل الدخول أو دفع المال",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
 
  {
    id: 16,
    question: "ما أفضل مكان لفتح رابط البنك؟",
    options: {
      red: "من إعلان غريب",
      blue: "من رسالة مجهولة",
      green: "من أي رابط قصير",
      yellow: "من التطبيق أو الموقع الرسمي",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
  
  {
    id: 17,
    question: "ما الفرق المهم بين HTTP وHTTPS؟",
    options: {
      red: "لا يوجد أي فرق",
      blue: "HTTP أسرع دائمًا",
      green: "HTTPS أكثر أمانًا ويحمي البيانات بشكل أفضل",
      yellow: "HTTPS يعمل دون إنترنت",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 18,
    question: "ماذا يجب أن تفعل عند استخدام Wi-Fi عام؟",
    options: {
      red: "تفتح أي رابط يظهر لك",
      blue: "ترسل كلمة المرور للجميع",
      green: "تستخدم نفس كلمة المرور لكل الحسابات",
      yellow: "تجنب إدخال المعلومات الحساسة إذا لم تكن الشبكة آمنة",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  }
];
