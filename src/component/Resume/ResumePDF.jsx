
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
  experience: {
    marginBottom: 6,
  },
});

// Create Document Component
const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Name:</Text>
        <Text style={styles.text}>{resumeData.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Email:</Text>
        <Text style={styles.text}>{resumeData.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Phone:</Text>
        <Text style={styles.text}>{resumeData.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Summary:</Text>
        <Text style={styles.text}>{resumeData.summary}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Work Experience:</Text>
        {resumeData.experiences.map((experience, index) => (
          <View key={index} style={styles.experience}>
            <Text style={styles.text}>Job Title: {experience.jobTitle}</Text>
            <Text style={styles.text}>Company: {experience.company}</Text>
            <Text style={styles.text}>Start Date: {experience.startDate}</Text>
            <Text style={styles.text}>End Date: {experience.endDate}</Text>
            <Text style={styles.text}>
              Description: {experience.description}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
