// // src/components/teacher/AssessmentTable.jsx
// import { useState } from "react";

// // Subjects we are tracking
// const SUBJECTS = [
//   "Maths",
//   "English",
//   "Kiswahili",
//   "Environment",
//   "Listening",
//   "Reading",
//   "Chemistry",
//   "Home Science",
// ];

// const AssessmentTable = () => {
//   const [learners, setLearners] = useState([
//     { name: "", admissionNo: "", marks: {} },
//   ]);

//   // Performance calculation function
//   const getPerformanceLevel = (score) => {
//     if (score >= 70) return "Exceeding Expectation";
//     if (score >= 60) return "Meeting Expectation";
//     if (score >= 40) return "Pass";
//     return "Fail";
//   };

//   const handleLearnerChange = (index, field, value) => {
//     const newLearners = [...learners];
//     newLearners[index][field] = value;
//     setLearners(newLearners);
//   };

//   const handleMarkChange = (learnerIndex, subject, value) => {
//     const newLearners = [...learners];
//     newLearners[learnerIndex].marks[subject] = Number(value);
//     setLearners(newLearners);
//   };

//   const addLearner = () => {
//     setLearners([...learners, { name: "", admissionNo: "", marks: {} }]);
//   };

//   const removeLearner = (index) => {
//     const newLearners = learners.filter((_, i) => i !== index);
//     setLearners(newLearners);
//   };

//   const calculateAverage = (marks) => {
//     const scores = Object.values(marks);
//     if (scores.length === 0) return 0;
//     return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
//   };

//   return (
//     <div style={{ overflowX: "auto" }}>
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>Learner Name</th>
//             {SUBJECTS.map((subj) => (
//               <th key={subj}>{subj}</th>
//             ))}
//             <th>Average</th>
//             <th>Performance</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {learners.map((learner, i) => {
//             const avg = calculateAverage(learner.marks);
//             const performance = getPerformanceLevel(avg);
//             return (
//               <tr key={i}>
//                 <td>
//                   <input
//                     type="text"
//                     value={learner.name}
//                     onChange={(e) =>
//                       handleLearnerChange(i, "name", e.target.value)
//                     }
//                     placeholder="Learner Name"
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={learner.admissionNo}
//                     onChange={(e) =>
//                       handleLearnerChange(i, "admissionNo", e.target.value)
//                     }
//                     placeholder="Admission No"
//                     required
//                   />
//                 </td>
//                 {SUBJECTS.map((subj) => (
//                   <td key={subj}>
//                     <input
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={learner.marks[subj] || ""}
//                       onChange={(e) =>
//                         handleMarkChange(i, subj, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//                 <td>{avg}%</td>
//                 <td>{performance}</td>
//                 <td>
//                   <button onClick={() => removeLearner(i)}>Remove</button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <button onClick={addLearner} style={{ marginTop: 10 }}>
//         Add Learner
//       </button>
//     </div>
//   );
// };

// export default AssessmentTable;


// src/components/teacher/AssessmentTable.jsx
import { useEffect } from "react";

// Subjects
const SUBJECTS = [
  "Maths",
  "English",
  "Kiswahili",
  "Environment",
  "Listening",
  "Reading",
  "Chemistry",
  "Home Science",
];

const AssessmentTable = ({ learners, setLearners }) => {
  const getPerformanceLevel = (score) => {
    if (score >= 70) return "Exceeding Expectation";
    if (score >= 60) return "Meeting Expectation";
    if (score >= 40) return "Pass";
    return "Fail";
  };

  const calculateAverage = (marks) => {
    const scores = Object.values(marks);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const handleLearnerChange = (index, value) => {
    const updated = [...learners];
    updated[index].name = value;
    setLearners(updated);
  };

  const handleMarkChange = (i, subject, value) => {
    const updated = [...learners];
    updated[i].marks[subject] = Number(value);
    setLearners(updated);
  };

  const addLearner = () =>
    setLearners([...learners, { name: "", marks: {} }]);

  const removeLearner = (i) =>
    setLearners(learners.filter((_, index) => index !== i));

  return (
    <div style={{ overflowX: "auto" }}>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Learner Name</th>
            {SUBJECTS.map((s) => (
              <th key={s}>{s}</th>
            ))}
            <th>Average</th>
            <th>Performance</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {learners.map((learner, i) => {
            const avg = calculateAverage(learner.marks);
            const perf = getPerformanceLevel(avg);

            return (
              <tr key={i}>
                <td>
                  <input
                    value={learner.name}
                    onChange={(e) => handleLearnerChange(i, e.target.value)}
                    placeholder="Learner Name"
                  />
                </td>

                {SUBJECTS.map((s) => (
                  <td key={s}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={learner.marks[s] || ""}
                      onChange={(e) =>
                        handleMarkChange(i, s, e.target.value)
                      }
                    />
                  </td>
                ))}

                <td>{avg}%</td>
                <td>{perf}</td>
                <td>
                  <button onClick={() => removeLearner(i)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={addLearner} style={{ marginTop: 10 }}>
        Add Learner
      </button>
    </div>
  );
};

export default AssessmentTable;
