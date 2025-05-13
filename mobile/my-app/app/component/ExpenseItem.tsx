import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ item }: any) => (
  <View style={styles.table}>
    <View style={styles.row}>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>${item.amount}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ExpenseItem;
