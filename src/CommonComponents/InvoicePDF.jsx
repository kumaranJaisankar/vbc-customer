import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import InvoicePDFImage from "../Assets/invoice_template.jpg";
import styled from "styled-components";

const styles = StyleSheet.create({
  pdfviewer: { width: "100%", height: "90%" },
  document: {},
  page: {},
  text: {},
  absolute: {
    position: "absolute",
  },
  width: {
    width: "100%",
  },
  width90: {
    width: "90%",
  },
  textCenter: {
    textAlign: "center",
  },
  fontSize: {
    fontSize: "12px",
  },
  smallFont: {
    fontSize: "10px",
  },
  fornBold: {
    fontWeight: "600",
  },
  invoiceView: {
    top: "90px",
  },
  signatureView: {
    bottom: "40px",
  },
  gstView: {
    bottom: "130px",
    left: "25px",
  },
  paymentsView: {
    bottom: "260px",
    left: "45px",
  },
  invoiceBreakupView: {
    top: "347px",
    left: "45px",
  },
  paymentsFlex: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  paymentsFlexPosition: {
    flexDirection: "row",
    justifyContent: "center",
    bottom: "222px",
  },
  paymentsFlexDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  paymentsFlexDetailsPosition: {
    flexDirection: "row",
    justifyContent: "center",
    bottom: "190px",
  },
  invoiceFlex: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  invoiceFlexPosition: {
    flexDirection: "row",
    justifyContent: "center",
    top: "385px",
  },
  invoiceFlexDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  invoiceFlexDetailsPosition: {
    flexDirection: "row",
    justifyContent: "center",
    top: "420px",
  },
  custInfoFlex: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  custInfoFlexPosition: {
    flexDirection: "row",
    justifyContent: "center",
    top: "140px",
  },
  custInfoDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  custInfoDetailsPosition: {
    flexDirection: "row",
    justifyContent: "center",
    top: "180px",
  },
  paymentsFlexText: {
    width: "33%",
  },
  mt20: {
    marginTop: "20px",
  },
  overflowBreak: {
    textOverflow: "break",
  },
  custInfoPadding: {
    paddingBottom: "15px",
    paddingRight: "5px",
    paddingLeft: "5px",
  },
});

export const InvoicePDF = (props) => {
  return (
    <React.Fragment>
      <PDFViewer style={styles.pdfviewer}>
        <Document style={styles.document}>
          <Page size="A4" style={styles.page}>
            <Image src={InvoicePDFImage}></Image>
            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.textCenter,
                ...styles.fontSize,
                ...styles.invoiceView,
              }}
            >
              <Text>Invoice</Text>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.custInfoFlexPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.custInfoFlex,
                }}
              >
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Invoice From
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Invoice To
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Customer Information
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.custInfoDetailsPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.custInfoDetails,
                }}
              >
                <View
                  style={{
                    ...styles.paymentsFlexText,
                    ...styles.textCenter,
                    ...styles.overflowBreak,
                  }}
                >
                  <Text style={{ ...styles.custInfoPadding }}>
                    Vizag Broadcasting Company pvt ltd
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    #47-10-20,Flat No.401,4th floor,DwarakaPlaza,Dwaraka
                    Nagar,Visakhapatnam -530016
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    GSTIN:37AADCV9256F1ZZ
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    HSN Code:9984
                  </Text>
                </View>
                <View
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  <Text style={{ ...styles.custInfoPadding }}>sai ram</Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    621/254,SR Nagar Main RdSanjeeva Reddy
                    Nagar,HyderabadHyderabad,TelanganaIndia,500038
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    Registered Mobile:9160520590
                  </Text>
                </View>
                <View
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  <Text style={{ ...styles.custInfoPadding }}>
                    Customer Id:16986
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    Username: VBC0000041
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    Plan Start Date: Nov. 2, 2021
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    Plan End Date: Oct. 31, 2021
                  </Text>
                  <Text style={{ ...styles.custInfoPadding }}>
                    Plan Period: Nov. 2, 2021 To Oct. 31, 2021
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.fontSize,
                ...styles.fontBold,
                ...styles.invoiceBreakupView,
              }}
            >
              <Text>Invoice Breakup</Text>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.invoiceFlexPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.invoiceFlex,
                }}
              >
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Description
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Quantity
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Unit Cost
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Total
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.invoiceFlexDetailsPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.invoiceFlexDetails,
                }}
              >
                <Text
                  style={{
                    ...styles.paymentsFlexText,
                    ...styles.textCenter,
                    ...styles.overflowBreak,
                  }}
                >
                  Pck-Diw
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  1
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  10.00000
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  10.00000
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.fontSize,
                ...styles.fontBold,
                ...styles.paymentsView,
              }}
            >
              <Text>Payments</Text>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.paymentsFlexPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.paymentsFlex,
                }}
              >
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Bill No
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Payment Mode
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Ref No
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Notes
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Paid Date
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Paid Amount
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.smallFont,
                ...styles.fontBold,
                ...styles.paymentsFlexDetailsPosition,
              }}
            >
              <View
                style={{
                  ...styles.width90,
                  ...styles.paymentsFlexDetails,
                }}
              >
                <Text
                  style={{
                    ...styles.paymentsFlexText,
                    ...styles.textCenter,
                    ...styles.overflowBreak,
                  }}
                >
                  inv_IGkmTCQ9Dw4BBc
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  online
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Ref No
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Notes
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  Nov. 2, 2021
                </Text>
                <Text
                  style={{ ...styles.paymentsFlexText, ...styles.textCenter }}
                >
                  290
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.fontSize,
                ...styles.gstView,
              }}
            >
              <Text>1.GST NUMBER : 37AADCV9256F1ZZ</Text>
            </View>

            <View
              style={{
                ...styles.absolute,
                ...styles.width,
                ...styles.textCenter,
                ...styles.fontSize,
                ...styles.signatureView,
              }}
            >
              <Text>
                ***This is computer generated invoice.No signature required***
              </Text>
              <Text style={{ ...styles.mt20 }}>
                Thank you for your prompt payment.
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </React.Fragment>
  );
};
