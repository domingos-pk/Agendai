import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, Clock, MapPin, CreditCard, Wallet, ArrowRight, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/colors';

const dates = ['Sat 22', 'Sat 22', 'Sat 22', 'Sat 22'];
const times = ['08:30 AM', '09:00 AM', '10:30 AM', '12:00 PM'];
const appointmentTypes = ['Home Visit', 'In Clinic'];
const paymentMethods = ['Credit Card', 'Google Pay', 'Apple Pay', 'Paypal'];

export default function BookAppointmentScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedType, setSelectedType] = useState(appointmentTypes[1]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  const stepTitles = ['Date & Time', 'Payment', 'Summary'];

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const buttonText = useMemo(() => {
    if (step === 3) return 'Book Now';
    return 'Continue';
  }, [step]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={previousStep}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepper}>
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;
            return (
              <View key={title} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    isActive && styles.stepCircleActive,
                    isCompleted && styles.stepCircleCompleted,
                  ]}
                >
                  <Text style={styles.stepCircleText}>{stepNumber}</Text>
                </View>
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{stepNumber}</Text>
              </View>
            );
          })}
        </View>

        {step === 1 && (
          <View style={styles.stepCard}>
            <Text style={styles.sectionTitle}>Available Date</Text>
            <View style={styles.rowWrap}>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={`${date}-${index}`}
                  style={[
                    styles.dateCard,
                    selectedDate === date && styles.dateCardActive,
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateCardText, selectedDate === date && styles.dateCardTextActive]}>{date}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Available Time</Text>
            <View style={styles.rowWrap}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeCard,
                    selectedTime === time && styles.timeCardActive,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeCardText, selectedTime === time && styles.timeCardTextActive]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Appointment Type</Text>
            <View style={styles.rowWrap}>
              {appointmentTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeCard,
                    selectedType === type && styles.typeCardActive,
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.typeCardText, selectedType === type && styles.typeCardTextActive]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepCard}>
            <View style={styles.cardPreview}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Visa</Text>
                <Text style={styles.cardNumber}>**** **** **** 2345</Text>
              </View>
              <View style={styles.cardMetaRow}>
                <View>
                  <Text style={styles.cardMetaLabel}>Card Holder name</Text>
                  <Text style={styles.cardMetaValue}>Noman Manzoor</Text>
                </View>
                <View>
                  <Text style={styles.cardMetaLabel}>Expiry Date</Text>
                  <Text style={styles.cardMetaValue}>02/30</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.addCardButton}>
              <Text style={styles.addCardText}>+ Add New Card</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment Option</Text>
            <View style={styles.paymentOptions}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method}
                  style={styles.paymentOption}
                  onPress={() => setSelectedPayment(method)}
                >
                  <View style={styles.radioOuter}>
                    {selectedPayment === method && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.paymentText}>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryLabel}>Doctor</Text>
                <Text style={styles.summaryValue}>Dr. Mohamed Ahmed</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Dentist</Text>
              </View>
            </View>
            <View style={styles.infoBlock}>
              <View style={styles.infoItem}>
                <Calendar size={16} color={Colors.primary} />
                <Text style={styles.infoText}>{selectedDate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Clock size={16} color={Colors.primary} />
                <Text style={styles.infoText}>{selectedTime}</Text>
              </View>
              <View style={styles.infoItem}>
                <MapPin size={16} color={Colors.primary} />
                <Text style={styles.infoText}>1113 Nile corniche</Text>
              </View>
              <View style={styles.infoItem}>
                <CreditCard size={16} color={Colors.primary} />
                <Text style={styles.infoText}>{selectedPayment}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
          <Text style={styles.continueButtonText}>{buttonText}</Text>
          <ChevronRight size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  stepCircleActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  stepCircleCompleted: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  stepCircleText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dateCard: {
    minWidth: 82,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 12,
    marginBottom: 12,
  },
  dateCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateCardText: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  dateCardTextActive: {
    color: Colors.white,
  },
  timeCard: {
    minWidth: 110,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 12,
    marginBottom: 12,
  },
  timeCardActive: {
    backgroundColor: Colors.primary,
  },
  timeCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  timeCardTextActive: {
    color: Colors.white,
  },
  typeCard: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    marginRight: 12,
    marginBottom: 12,
  },
  typeCardActive: {
    backgroundColor: Colors.primary,
  },
  typeCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  typeCardTextActive: {
    color: Colors.white,
  },
  cardPreview: {
    borderRadius: 20,
    backgroundColor: '#1E40AF',
    padding: 22,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMetaLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  cardMetaValue: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
  addCardButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  addCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  paymentOptions: {
    marginTop: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  paymentText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  statusBadgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  infoBlock: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
