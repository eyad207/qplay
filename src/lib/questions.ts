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
      red: "التواصل والوصول إلى المعلومات",
      blue: "منع التواصل",
      green: "إيقاف التعليم",
      yellow: "حذف الملفات دائمًا",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "ما الصفة المهمة لكلمة المرور القوية؟",
    options: {
      red: "أن تحتوي على حروف وأرقام ورموز",
      blue: "أن تكون قصيرة جدًا",
      green: "أن تكون اسمك فقط",
      yellow: "أن تكون كلمة واحدة سهلة",
    },
    correctAnswer: "red",
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
      red: "استخدام طريقتين للتأكد من هوية المستخدم",
      blue: "استخدام حسابين فقط",
      green: "كتابة كلمة المرور مرتين",
      yellow: "تغيير الهاتف كل يوم",
    },
    correctAnswer: "red",
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
      red: "نعم، تبدو رسالة حقيقية",
      blue: "لا، إنها احتيالية",
      green: "إنها رسالة مدرسية",
      yellow: "لا يمكن قراءة الرسالة",
    },
    correctAnswer: "red",
    timeLimit: 40,
  },
  {
    id: 8,
    question: "هل هذه رسالة احتيالية؟",
    image: "/img3_true.png",
    options: {
      red: "نعم، إنها احتيالية",
      blue: "لا، إنها حقيقية",
      green: "إنها رسالة مدرسية",
      yellow: "لا يمكن معرفة ذلك",
    },
    correctAnswer: "red",
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
      red: "تغلق الصفحة ولا تدخل أي معلومات",
      blue: "تدخل كلمة المرور",
      green: "ترسل الرابط لأصدقائك",
      yellow: "تدفع المال فورًا",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 11,
    question: "ما هو الذكاء الاصطناعي؟",
    options: {
      red: "تقنية تساعد الأجهزة على أداء مهام ذكية",
      blue: "نوع من كلمات المرور",
      green: "رابط إلكتروني فقط",
      yellow: "جهاز لا يعمل إلا دون إنترنت",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
];
