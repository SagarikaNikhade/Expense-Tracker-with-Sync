import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addExpense } from '../services/api'; // Adjust the import path as necessary
import { isOnline } from '../services/network';
import { syncExpenses } from '../services/sync';
import { addToQueue, loadExpenses, saveExpenses } from '../storage/localDB';

export default function HomeScreen() {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date(),
    description: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  };

  // const handleSubmit = async () => {
  //   if (!formData.amount || !formData.category || !formData.description) {
  //     alert('Please fill in all required fields');
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const expenseData = {
  //       ...formData,
  //       amount: parseFloat(formData.amount),
  //     };
      
  //     await addExpense(expenseData);  
  //     // Simulate API or sync call
  //     alert('Expense added successfully!');
  //     // setFormData({
  //     //   amount: '',
  //     //   category: '',
  //     //   date: new Date(),
  //     //   description: '',
  //     // });
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
  if (!formData.amount || !formData.category || !formData.description) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    setIsSubmitting(true);
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    const online = await isOnline();

    if (online) {
      await addExpense(expenseData);
      await syncExpenses(); // trigger sync in case there were old offline entries
    } else {
      await addToQueue(expenseData);
      const localExpenses = await loadExpenses();
      await saveExpenses([...localExpenses, expenseData]);
    }

    alert('Expense saved successfully!');
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Expense</Text>

      <Text style={styles.label}>Amount *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={text => handleChange('amount', text)}
        placeholder="Enter amount"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Category *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.category}
          onValueChange={value => handleChange('category', value)}
          dropdownIconColor="#000000"
          style={styles.picker}
        >
          <Picker.Item label="Select category" value="" color="#888" />
          <Picker.Item label="Food" value="Food" color="#888" />
          <Picker.Item label="Transportation" value="Transportation" color="#888" />
          <Picker.Item label="Housing" value="Housing" color="#888" />
          <Picker.Item label="Entertainment" value="Entertainment" color="#888" />
          <Picker.Item label="Utilities" value="Utilities" color="#888" />
          <Picker.Item label="Healthcare" value="Healthcare" color="#888" />
          <Picker.Item label="Other" value="Other" color="#888" />
        </Picker>
      </View>

      {/* <Text style={styles.label}>Date</Text>
      <View style={styles.dateButton}>
        <Button
          title={formData.date.toDateString()}
          onPress={() => setShowDatePicker(true)}
          color="#00bfff"
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )} */}
      <Text style={styles.label}>Date</Text>
        <TouchableOpacity 
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>{formData.date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={formData.description}
        onChangeText={text => handleChange('description', text)}
        placeholder="Enter description"
        placeholderTextColor="#888"
      />

      <View style={styles.submitButton}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#00bfff" />
        ) : (
          <Button title="Add Expense" onPress={handleSubmit} color="#00bfff" />
        )}
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 safeArea:{
  flex:1,
  backgroundColor: '#121212'
 },
  container: {
    padding: 20,
    backgroundColor: '#121212', // Black background
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 100 : 20,
  },
  heading: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#1e1e1e',
  },
  picker: {
    color: '#fff',
  },
  dateButton: {
    marginTop: 8,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },

  // 
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#1e1e1e',
    alignItems: 'flex-start',
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
});
