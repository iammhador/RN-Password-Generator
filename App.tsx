/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Slider from 'react-native-slider';

export default function App() {
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<string>('');
  const [upperCase, setUpperCase] = useState<boolean>(false);
  const [lowerCase, setLowerCase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);

  //# Check Password Strength =>
  const checkPasswordStrength = (password: string): string => {
    const criteria = {
      minLength: 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-={}[\]:;"<>,.?/]/.test(password),
    };

    const strengthScore =
      (criteria.hasUpperCase ? 2 : 0) +
      (criteria.hasLowerCase ? 2 : 0) +
      (criteria.hasNumber ? 2 : 0) +
      (criteria.hasSymbol ? 2 : 0) +
      (password.length >= criteria.minLength ? 2 : 0);

    if (strengthScore >= 10) {
      return 'Strong';
    } else if (strengthScore >= 6) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  //# Create A New Password =>
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  //# Generate A New Password =>
  const generatePassword = (passwordLength: number) => {
    let characterList = '';

    //@ List Of All The Characters =>
    const upperCaseCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharacter = 'abcdefghijklmnopqrstuvwxyz';
    const numbersCharacter = '0123456789';
    const symbolsCharacter = '!@#$%^&*()_+-={}[]|:;"<>,.?/';

    if (upperCase) {
      characterList += upperCaseCharacter;
    }
    if (lowerCase) {
      characterList += lowerCaseCharacter;
    }
    if (numbers) {
      characterList += numbersCharacter;
    }
    if (symbols) {
      characterList += symbolsCharacter;
    }

    const result = createPassword(characterList, passwordLength);
    setPassword(result);
    const strengthPass = checkPasswordStrength(result);
    setStrength(strengthPass);
  };

  //# Reset Password =>
  const resetPassword = () => {
    setPassword('');
    setStrength('');
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.titleText}>Generate password</Text>
        </View>

        <View style={styles.passwordGenerateContainer}>
          <Text style={styles.passwordGenerateContainerTitleText}>
            Generated password
          </Text>
          <View style={styles.passwordGenerateBox}>
            <Text selectable={true} style={styles.passwordGenerateBoxText}>
              {password}
            </Text>
          </View>
        </View>

        <View style={styles.lengthContainer}>
          <Text style={styles.lengthContainerTitleText}>Length</Text>
          <View style={styles.lengthContainerSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              minimumValue={6}
              maximumValue={20}
              step={1}
              value={6}
              thumbTintColor="#FFFFFF"
              minimumTrackTintColor="#2169F2"
              maximumTrackTintColor="gray"
              onValueChange={(value: number) => {
                generatePassword(+value);
              }}
            />

            <View style={styles.sliderTextContainer}>
              <Text style={styles.sliderTextOne}>6</Text>
              {strength &&
                password &&
                (upperCase || lowerCase || numbers || symbols) && (
                  <Text
                    style={{
                      color:
                        strength === 'Strong'
                          ? '#FF005C'
                          : strength === 'Moderate'
                          ? '#ff9470'
                          : '#7BD3EA',
                    }}>
                    {strength ? strength : ''}
                  </Text>
                )}
              <Text style={styles.sliderTextTwo}>20</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxTitleText}>Setting</Text>
          <View style={styles.checkboxIndividualContainer}>
            <BouncyCheckbox
              size={25}
              fillColor="#FF005C"
              unfillColor="#FFFFFF"
              text="Uppercase Characters ( A - Z )"
              iconStyle={{borderColor: '#1FF005C'}}
              innerIconStyle={{borderWidth: 3}}
              textStyle={styles.checkboxText}
              isChecked={upperCase}
              onPress={() => setUpperCase(!upperCase)}
            />
          </View>
          <View style={styles.checkboxIndividualContainer}>
            <BouncyCheckbox
              size={25}
              fillColor="#7BD3EA"
              unfillColor="#FFFFFF"
              text="Lowercase Characters ( a - z )"
              iconStyle={{borderColor: '#7BD3EA'}}
              innerIconStyle={{borderWidth: 3}}
              textStyle={styles.checkboxText}
              isChecked={lowerCase}
              onPress={() => setLowerCase(!lowerCase)}
            />
          </View>
          <View style={styles.checkboxIndividualContainer}>
            <BouncyCheckbox
              size={25}
              fillColor="#ff9470"
              unfillColor="#FFFFFF"
              text="Number Characters ( 0 - 9 )"
              iconStyle={{borderColor: '#ff9470'}}
              innerIconStyle={{borderWidth: 3}}
              textStyle={styles.checkboxText}
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
            />
          </View>
          <View style={styles.checkboxIndividualContainer}>
            <BouncyCheckbox
              size={25}
              fillColor="#A63EC5"
              unfillColor="#FFFFFF"
              text="Symbol Characters ( #, @, % ... )"
              iconStyle={{borderColor: '#A63EC5'}}
              innerIconStyle={{borderWidth: 3}}
              textStyle={styles.checkboxText}
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
            />
          </View>
        </View>

        <View style={styles.PasswordGeneratedBtnContainer}>
          <TouchableOpacity
            style={styles.PasswordGeneratedResetBtn}
            onPress={() => {
              resetPassword();
            }}>
            <Text style={styles.PasswordGeneratedResetBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#01062A',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  passwordGenerateContainer: {
    marginVertical: 5,
  },
  passwordGenerateContainerTitleText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: '#525F88',
  },
  passwordGenerateBox: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#02103F',
    color: '#FFFFFF',
    marginTop: 5,
  },
  passwordGenerateBoxText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  lengthContainer: {
    marginTop: 10,
  },
  lengthContainerTitleText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    marginBottom: 5,
    color: '#525F88',
  },
  lengthContainerSlider: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#02103F',
  },
  sliderTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  sliderTextOne: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  sliderTextTwo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  checkboxTitleText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: '#525F88',
  },
  checkboxContainer: {
    marginVertical: 15,
  },
  checkboxIndividualContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#02103F',
    color: '#FFFFFF',
    marginVertical: 5,
  },
  checkboxText: {
    textDecorationLine: 'none',
    color: '#FFFFFF',
  },
  PasswordGeneratedBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  PasswordGeneratedResetBtn: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#2168F2',
    borderRadius: 5,
  },
  PasswordGeneratedResetBtnText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});
