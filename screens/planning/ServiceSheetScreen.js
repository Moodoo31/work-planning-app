import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

export default function ServiceSheetScreen({ route }) {
  const { planning } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feuille de Service</Text>
      <Text style={styles.date}>{new Date(planning.date).toLocaleDateString('fr-FR')}</Text>
      
      {planning.serviceId?.serviceImage && (
        <Image
          source={{ uri: planning.serviceId.serviceImage }}
          style={styles.serviceImage}
          resizeMode="contain"
        />
      )}

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{planning.serviceId?.serviceCode}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Heure de début:</Text>
          <Text style={styles.value}>{planning.serviceId?.startTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Heure de fin:</Text>
          <Text style={styles.value}>{planning.serviceId?.endTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Durée:</Text>
          <Text style={styles.value}>{planning.serviceId?.duration} min</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  serviceImage: {
    width: '100%',
    height: 400,
    marginBottom: 20,
    borderRadius: 8,
  },
  details: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#666',
  },
});
