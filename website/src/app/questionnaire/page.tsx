'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface FormValues {
  mentalHealthDefinition: string;
  mentalHealthSymptoms: string[];
  mentalVsPhysical: string;
  awarenessOfDisorders: string;
  learningSource: string;
  discussionComfort: string;
  understandingLevel: string;
  getOver: string;
  seekingHelp: string;
  societalSeriousness: string;
  schoolResources: string;
  counselorExperience: string;
  supportImprovements: string[];
}

export default function Questionnaire() {
  const [showResults, setShowResults] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const validationSchema = Yup.object({
    mentalHealthDefinition: Yup.string().required('Please select an option'),
    mentalHealthSymptoms: Yup.array().min(1, 'Please select at least one option').of(Yup.string()),
    mentalVsPhysical: Yup.string().required('Please select an option'),
    awarenessOfDisorders: Yup.string().required('Please select an option'),
    learningSource: Yup.string().required('Please select an option'),
    discussionComfort: Yup.string().required('Please select an option'),
    understandingLevel: Yup.string().required('Please select an option'),
    getOver: Yup.string().required('Please select an option'),
    seekingHelp: Yup.string().required('Please select an option'),
    societalSeriousness: Yup.string().required('Please select an option'),
    schoolResources: Yup.string().required('Please select an option'),
    counselorExperience: Yup.string().required('Please select an option'),
    supportImprovements: Yup.array().min(1, 'Please select at least one option').of(Yup.string()),
  });

  const initialValues: FormValues = {
    mentalHealthDefinition: '',
    mentalHealthSymptoms: [],
    mentalVsPhysical: '',
    awarenessOfDisorders: '',
    learningSource: '',
    discussionComfort: '',
    understandingLevel: '',
    getOver: '',
    seekingHelp: '',
    societalSeriousness: '',
    schoolResources: '',
    counselorExperience: '',
    supportImprovements: [],
  };

  const calculateScore = (values: FormValues): number => {
    let score = 0;
    
    // Section 1
    if (values.mentalHealthDefinition === 'b') score += 3;
    else if (values.mentalHealthDefinition === 'c') score += 2;
    else if (values.mentalHealthDefinition === 'a') score += 1;
    
    const symptoms = values.mentalHealthSymptoms.filter(s => s !== 'e').length;
    if (symptoms >= 3) score += 3;
    else if (symptoms >= 1) score += 1;
    
    if (values.mentalVsPhysical === 'a') score += 3;
    
    // Section 2
    if (values.awarenessOfDisorders === 'a') score += 2;
    if (values.learningSource !== 'd') score += 1;
    
    if (values.discussionComfort === 'a') score += 3;
    else if (values.discussionComfort === 'b') score += 2;
    else if (values.discussionComfort === 'c') score += 1;
    
    score += parseInt(values.understandingLevel, 10);
    
    // Section 3
    if (values.getOver === 'b') score += 3;
    
    if (values.seekingHelp === 'a') score += 2;
    else if (values.seekingHelp === 'c') score += 1;
    
    if (values.societalSeriousness === 'b') score += 2;
    
    // Section 4
    if (values.schoolResources === 'a') score += 1;
    if (values.counselorExperience === 'a') score += 2;
    
    const improvements = values.supportImprovements.filter(s => s !== 'e').length;
    if (improvements >= 3) score += 3;
    else if (improvements >= 1) score += 1;
    
    return Math.round((score / 33) * 100);
  }

  const handleSubmit = (values: FormValues) => {
    const calculatedScore = calculateScore(values);
    setScore(calculatedScore);
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (showResults) {
    let category: string;
    let description: string;
    
    if (score >= 80) {
      category = "High Awareness";
      description = "You have a strong understanding of mental health issues and their importance.";
    } else if (score >= 60) {
      category = "Moderate Awareness";
      description = "You have a good foundation of mental health knowledge, but there's room to learn more.";
    } else if (score >= 40) {
      category = "Basic Awareness";
      description = "You're familiar with some mental health concepts, but could benefit from more education.";
    } else {
      category = "Limited Awareness";
      description = "You may want to learn more about mental health to better understand and support yourself and others.";
    }

    return (
      <div className="w-full min-h-screen flex flex-col items-center">
        <Header/>
        <div className="max-w-2xl w-full mx-auto p-6 md:p-12 mt-32">
          <h1 className="text-2xl font-bold mb-4">Your Results</h1>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="text-4xl font-bold text-center mb-2">{score}%</p>
            <h2 className="text-xl font-semibold text-center mb-2">{category}</h2>
            <p className="text-center">{description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setShowAnswers(!showAnswers)} 
              className="w-full py-2 bg-blue-600 text-white rounded">
              {showAnswers ? "Hide Correct Answers" : "Show Correct Answers"}
            </button>
            <button 
              onClick={() => setShowResults(false)} 
              className="w-full py-2 bg-custom-yellow text-white rounded">
              Retake Questionnaire
            </button>
          </div>

          {showAnswers && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Answers to key questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">How would you define mental health?</h3>
                  <p className="text-green-700">Best answer: Emotional, psychological, and social well-being</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Which of the following are symptoms of mental health struggles?</h3>
                  <p className="text-green-700">All options except &quot;I don&apos;t know&quot; are correct indicators</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Is mental health as important as physical health?</h3>
                  <p className="text-green-700">Yes</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Can people just &quot;get over&quot; mental health problems?</h3>
                  <p className="text-green-700">No, professional help may be needed</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Do you think society takes mental health seriously enough?</h3>
                  <p className="text-green-700">No (society often needs to take mental health more seriously)</p>
                </div>
                
                <div className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  <p>Note: These are the answers that earned the most points in the assessment, but mental health is complex and nuanced. Everyone&apos;s experiences are different.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header/>
      <div className="max-w-2xl mx-auto p-6 mt-32">
        <h1 className="text-2xl font-bold mb-4">Mental Health Awareness Questionnaire</h1>
        <p className="mb-8">Please answer the following questions honestly. Your responses will help us understand how well students are aware of mental health issues.</p>
        
        <form onSubmit={formik.handleSubmit} className="space-y-12">
          <div className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Section 1: General Understanding of Mental Health</h2>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">How would you define mental health?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="mentalHealthDefinition" value="a" onChange={formik.handleChange} checked={formik.values.mentalHealthDefinition === 'a'} className="mr-2" />The absence of mental illness</label>
                <label className="flex items-center"><input type="radio" name="mentalHealthDefinition" value="b" onChange={formik.handleChange} checked={formik.values.mentalHealthDefinition === 'b'} className="mr-2" />Emotional, psychological, and social well-being</label>
                <label className="flex items-center"><input type="radio" name="mentalHealthDefinition" value="c" onChange={formik.handleChange} checked={formik.values.mentalHealthDefinition === 'c'} className="mr-2" />Ability to handle stress and daily life challenges</label>
                <label className="flex items-center"><input type="radio" name="mentalHealthDefinition" value="d" onChange={formik.handleChange} checked={formik.values.mentalHealthDefinition === 'd'} className="mr-2" />I don&apos;t know</label>
              </div>
              {formik.touched.mentalHealthDefinition && formik.errors.mentalHealthDefinition && (
                <div className="text-red-500 mt-1">{formik.errors.mentalHealthDefinition}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Which of the following do you think are symptoms of mental health struggles? (Select all that apply)</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="checkbox" name="mentalHealthSymptoms" value="a" onChange={formik.handleChange} checked={formik.values.mentalHealthSymptoms.includes('a')} className="mr-2" />Feeling sad or down for a long time</label>
                <label className="flex items-center"><input type="checkbox" name="mentalHealthSymptoms" value="b" onChange={formik.handleChange} checked={formik.values.mentalHealthSymptoms.includes('b')} className="mr-2" />Changes in eating or sleeping patterns</label>
                <label className="flex items-center"><input type="checkbox" name="mentalHealthSymptoms" value="c" onChange={formik.handleChange} checked={formik.values.mentalHealthSymptoms.includes('c')} className="mr-2" />Difficulty concentrating</label>
                <label className="flex items-center"><input type="checkbox" name="mentalHealthSymptoms" value="d" onChange={formik.handleChange} checked={formik.values.mentalHealthSymptoms.includes('d')} className="mr-2" />Avoiding friends and social activities</label>
                <label className="flex items-center"><input type="checkbox" name="mentalHealthSymptoms" value="e" onChange={formik.handleChange} checked={formik.values.mentalHealthSymptoms.includes('e')} className="mr-2" />I don&apos;t know</label>
              </div>
              {formik.touched.mentalHealthSymptoms && formik.errors.mentalHealthSymptoms && (
                <div className="text-red-500 mt-1">{formik.errors.mentalHealthSymptoms as string}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Do you believe mental health is as important as physical health?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="mentalVsPhysical" value="a" onChange={formik.handleChange} checked={formik.values.mentalVsPhysical === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="mentalVsPhysical" value="b" onChange={formik.handleChange} checked={formik.values.mentalVsPhysical === 'b'} className="mr-2" />No</label>
                <label className="flex items-center"><input type="radio" name="mentalVsPhysical" value="c" onChange={formik.handleChange} checked={formik.values.mentalVsPhysical === 'c'} className="mr-2" />Not sure</label>
              </div>
              {formik.touched.mentalVsPhysical && formik.errors.mentalVsPhysical && (
                <div className="text-red-500 mt-1">{formik.errors.mentalVsPhysical}</div>
              )}
            </div>
          </div>
          
          <div className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Section 2: Awareness and Knowledge of Mental Health Issues</h2>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Have you ever heard of mental health disorders such as depression, anxiety, or bipolar disorder?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="awarenessOfDisorders" value="a" onChange={formik.handleChange} checked={formik.values.awarenessOfDisorders === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="awarenessOfDisorders" value="b" onChange={formik.handleChange} checked={formik.values.awarenessOfDisorders === 'b'} className="mr-2" />No</label>
              </div>
              {formik.touched.awarenessOfDisorders && formik.errors.awarenessOfDisorders && (
                <div className="text-red-500 mt-1">{formik.errors.awarenessOfDisorders}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Where have you learned the most about mental health?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="learningSource" value="a" onChange={formik.handleChange} checked={formik.values.learningSource === 'a'} className="mr-2" />School</label>
                <label className="flex items-center"><input type="radio" name="learningSource" value="b" onChange={formik.handleChange} checked={formik.values.learningSource === 'b'} className="mr-2" />Social media</label>
                <label className="flex items-center"><input type="radio" name="learningSource" value="c" onChange={formik.handleChange} checked={formik.values.learningSource === 'c'} className="mr-2" />Friends and family</label>
                <label className="flex items-center"><input type="radio" name="learningSource" value="d" onChange={formik.handleChange} checked={formik.values.learningSource === 'd'} className="mr-2" />I have not learned about mental health</label>
              </div>
              {formik.touched.learningSource && formik.errors.learningSource && (
                <div className="text-red-500 mt-1">{formik.errors.learningSource}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">How comfortable are you discussing mental health with someone else?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="discussionComfort" value="a" onChange={formik.handleChange} checked={formik.values.discussionComfort === 'a'} className="mr-2" />Very comfortable</label>
                <label className="flex items-center"><input type="radio" name="discussionComfort" value="b" onChange={formik.handleChange} checked={formik.values.discussionComfort === 'b'} className="mr-2" />Somewhat comfortable</label>
                <label className="flex items-center"><input type="radio" name="discussionComfort" value="c" onChange={formik.handleChange} checked={formik.values.discussionComfort === 'c'} className="mr-2" />Neutral</label>
                <label className="flex items-center"><input type="radio" name="discussionComfort" value="d" onChange={formik.handleChange} checked={formik.values.discussionComfort === 'd'} className="mr-2" />Not comfortable at all</label>
              </div>
              {formik.touched.discussionComfort && formik.errors.discussionComfort && (
                <div className="text-red-500 mt-1">{formik.errors.discussionComfort}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">On a scale of 1 to 5, how well do you understand mental health? (1 = Not at all, 5 = Very well)</p>
              <div className="flex flex-wrap gap-6">
                {[1, 2, 3, 4, 5].map(num => (
                  <label key={num} className="flex items-center"><input type="radio" name="understandingLevel" value={num.toString()} onChange={formik.handleChange} checked={formik.values.understandingLevel === num.toString()} className="mr-1" />{num}</label>
                ))}
              </div>
              {formik.touched.understandingLevel && formik.errors.understandingLevel && (
                <div className="text-red-500 mt-1">{formik.errors.understandingLevel}</div>
              )}
            </div>
          </div>
          
          <div className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Section 3: Attitudes and Perceptions</h2>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Do you think mental health problems are something people can just &quot;get over&quot;?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="getOver" value="a" onChange={formik.handleChange} checked={formik.values.getOver === 'a'} className="mr-2" />Yes, with enough effort</label>
                <label className="flex items-center"><input type="radio" name="getOver" value="b" onChange={formik.handleChange} checked={formik.values.getOver === 'b'} className="mr-2" />No, professional help may be needed</label>
                <label className="flex items-center"><input type="radio" name="getOver" value="c" onChange={formik.handleChange} checked={formik.values.getOver === 'c'} className="mr-2" />I&apos;m not sure</label>
              </div>
              {formik.touched.getOver && formik.errors.getOver && (
                <div className="text-red-500 mt-1">{formik.errors.getOver}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Would you feel comfortable seeking help if you were struggling with mental health?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="seekingHelp" value="a" onChange={formik.handleChange} checked={formik.values.seekingHelp === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="seekingHelp" value="b" onChange={formik.handleChange} checked={formik.values.seekingHelp === 'b'} className="mr-2" />No</label>
                <label className="flex items-center"><input type="radio" name="seekingHelp" value="c" onChange={formik.handleChange} checked={formik.values.seekingHelp === 'c'} className="mr-2" />Maybe</label>
              </div>
              {formik.touched.seekingHelp && formik.errors.seekingHelp && (
                <div className="text-red-500 mt-1">{formik.errors.seekingHelp}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Do you think society takes mental health seriously enough?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="societalSeriousness" value="a" onChange={formik.handleChange} checked={formik.values.societalSeriousness === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="societalSeriousness" value="b" onChange={formik.handleChange} checked={formik.values.societalSeriousness === 'b'} className="mr-2" />No</label>
                <label className="flex items-center"><input type="radio" name="societalSeriousness" value="c" onChange={formik.handleChange} checked={formik.values.societalSeriousness === 'c'} className="mr-2" />I&apos;m not sure</label>
              </div>
              {formik.touched.societalSeriousness && formik.errors.societalSeriousness && (
                <div className="text-red-500 mt-1">{formik.errors.societalSeriousness}</div>
              )}
            </div>
          </div>
          
          <div className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Section 4: Support and Access to Resources</h2>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Does your school provide mental health education or resources?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="schoolResources" value="a" onChange={formik.handleChange} checked={formik.values.schoolResources === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="schoolResources" value="b" onChange={formik.handleChange} checked={formik.values.schoolResources === 'b'} className="mr-2" />No</label>
                <label className="flex items-center"><input type="radio" name="schoolResources" value="c" onChange={formik.handleChange} checked={formik.values.schoolResources === 'c'} className="mr-2" />I don&apos;t know</label>
              </div>
              {formik.touched.schoolResources && formik.errors.schoolResources && (
                <div className="text-red-500 mt-1">{formik.errors.schoolResources}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">Have you ever spoken to a counselor or mental health professional?</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="radio" name="counselorExperience" value="a" onChange={formik.handleChange} checked={formik.values.counselorExperience === 'a'} className="mr-2" />Yes</label>
                <label className="flex items-center"><input type="radio" name="counselorExperience" value="b" onChange={formik.handleChange} checked={formik.values.counselorExperience === 'b'} className="mr-2" />No</label>
              </div>
              {formik.touched.counselorExperience && formik.errors.counselorExperience && (
                <div className="text-red-500 mt-1">{formik.errors.counselorExperience}</div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="mb-3 font-medium text-gray-700">What would make it easier for students to seek mental health support? (Select all that apply)</p>
              <div className="space-y-2">
                <label className="flex items-center"><input type="checkbox" name="supportImprovements" value="a" onChange={formik.handleChange} checked={formik.values.supportImprovements.includes('a')} className="mr-2" />More awareness programs in schools</label>
                <label className="flex items-center"><input type="checkbox" name="supportImprovements" value="b" onChange={formik.handleChange} checked={formik.values.supportImprovements.includes('b')} className="mr-2" />Access to counseling services</label>
                <label className="flex items-center"><input type="checkbox" name="supportImprovements" value="c" onChange={formik.handleChange} checked={formik.values.supportImprovements.includes('c')} className="mr-2" />Less stigma around mental health</label>
                <label className="flex items-center"><input type="checkbox" name="supportImprovements" value="d" onChange={formik.handleChange} checked={formik.values.supportImprovements.includes('d')} className="mr-2" />More discussions with parents and teachers</label>
                <label className="flex items-center"><input type="checkbox" name="supportImprovements" value="e" onChange={formik.handleChange} checked={formik.values.supportImprovements.includes('e')} className="mr-2" />I don&apos;t know</label>
              </div>
              {formik.touched.supportImprovements && formik.errors.supportImprovements && (
                <div className="text-red-500 mt-1">{formik.errors.supportImprovements as string}</div>
              )}
            </div>
          </div>
          
          <button type="submit" className="w-full py-2 bg-custom-yellow text-white rounded">Submit</button>
        </form>
      </div>
      <Footer/>
    </div>
  )
}