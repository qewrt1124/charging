package project.oecr.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import project.oecr.api.dao.ApiDao;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class ApiServiceImpl
        implements ApiService {

    @Autowired
    private ApiDao apiDao;

    @Override
    public void jsonTest() {

        try {
            // OpenApi호출
            String urlstr = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=APLWQgi4YJF4psxWPW%2BUuDpvq46J8yiGFt0AYGIToTw28Y37qTWA2vDreeRoRO7JbnZITOw3NqRKa8rGnfqdEg%3D%3D&pageNo=1&numOfRows=10&zcode=11";

            DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();

            Document doc = dBuilder.parse(urlstr);

            // root tag
            doc.getDocumentElement().normalize();

            StringWriter clsOutput = new StringWriter();
            Transformer clsTrans = TransformerFactory.newInstance().newTransformer();

            clsTrans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
            clsTrans.setOutputProperty(OutputKeys.METHOD, "xml");
            clsTrans.setOutputProperty(OutputKeys.INDENT, "yes");
            clsTrans.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

            clsTrans.transform(new DOMSource(doc), new StreamResult(clsOutput));

            String electric = clsOutput.toString();

            JSONObject jsonObject = XML.toJSONObject(electric);

            JSONObject jsonResponse = (JSONObject) jsonObject.get("response");

            JSONObject jsonHeader = (JSONObject) jsonResponse.get("header");

            int totalCount = jsonHeader.getInt("totalCount");
            System.out.println(totalCount);

            JSONObject jsonBody = (JSONObject) jsonResponse.get("body");
            JSONObject jsonItems = (JSONObject) jsonBody.get("items");
            JSONArray jsonItem = (JSONArray) jsonItems.get("item");
            ArrayList<Object> electricInfo = new ArrayList<Object>();
            electricInfo.add(jsonItem.get(0));
            electricInfo.get(0);
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(jsonItem.get(0).toString(), Map.class);
            System.out.println(map);
            System.out.println("bnm = " + map.get("bnm"));

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public void inputDataList() {
        String urlstr = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?";
        String serviceKey = "serviceKey=APLWQgi4YJF4psxWPW%2BUuDpvq46J8yiGFt0AYGIToTw28Y37qTWA2vDreeRoRO7JbnZITOw3NqRKa8rGnfqdEg%3D%3D";
        String pageNo = "&pageNo=";
        String numOfRows = "&numOfRows=10";
        String zcode = "&zcode=";

        try {
            DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();

            // 지역 코드
            int[] zcodeList = { 11, 26, 27, 28, 29, 30, 31, 36, 41, 42, 43, 44, 45, 46, 47, 48, 50 };

            for (int i = 0; i < zcodeList.length; i++) {
                String url = urlstr + serviceKey + pageNo + 1 + numOfRows + zcode + zcodeList[i];
                Document doc = dBuilder.parse(url);
                doc.getDocumentElement().normalize();

                StringWriter clsOutput = new StringWriter();
                Transformer clsTrans = TransformerFactory.newInstance().newTransformer();

                clsTrans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
                clsTrans.setOutputProperty(OutputKeys.METHOD, "xml");
                clsTrans.setOutputProperty(OutputKeys.INDENT, "yes");
                clsTrans.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

                clsTrans.transform(new DOMSource(doc), new StreamResult(clsOutput));

                String electric = clsOutput.toString();

                JSONObject jsonObject = XML.toJSONObject(electric);

                JSONObject jsonResponse = (JSONObject) jsonObject.get("response");
                JSONObject jsonHeader = (JSONObject) jsonResponse.get("header");
                JSONObject jsonBody = (JSONObject) jsonResponse.get("body");
                JSONObject jsonItems = (JSONObject) jsonBody.get("items");
                JSONArray jsonItem = (JSONArray) jsonItems.get("item");

                int totalCount = jsonHeader.getInt("totalCount");
                int totalPage = totalCount / 10 + 1;

                ArrayList<Object> electricInfo = new ArrayList<Object>();

                for (int j = 1; j <= totalPage; j++) {
                    url = urlstr + serviceKey + pageNo + j + numOfRows + zcode + zcodeList[i];
                    doc = dBuilder.parse(url);

                    // root tag
                    doc.getDocumentElement().normalize();

                    clsOutput = new StringWriter();
                    clsTrans = TransformerFactory.newInstance().newTransformer();

                    clsTrans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
                    clsTrans.setOutputProperty(OutputKeys.METHOD, "xml");
                    clsTrans.setOutputProperty(OutputKeys.INDENT, "yes");
                    clsTrans.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

                    clsTrans.transform(new DOMSource(doc), new StreamResult(clsOutput));

                    jsonResponse = (JSONObject) jsonObject.get("response");
                    jsonBody = (JSONObject) jsonResponse.get("body");
                    jsonItems = (JSONObject) jsonBody.get("items");
                    jsonItem = (JSONArray) jsonItems.get("item");

                    for (int z = 0; z < jsonItem.length(); z++) {
                        ObjectMapper mapper = new ObjectMapper();
                        Map<String, String> map = mapper.readValue(jsonItem.get(z).toString(), Map.class);
                        electricInfo.add(map);
                    }
                }
                System.out.println(electricInfo);
            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SAXException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public void inputData() {

        for (int i = 1; i <= 10; i++) {
            String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=APLWQgi4YJF4psxWPW%2BUuDpvq46J8yiGFt0AYGIToTw28Y37qTWA2vDreeRoRO7JbnZITOw3NqRKa8rGnfqdEg%3D%3D&numOfRows=10&zcode=36"
                    + "&pageNo=" + i;

            try {
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();

                Document doc = dBuilder.parse(url);
                doc.getDocumentElement().normalize();

                StringWriter clsOutput = new StringWriter();
                Transformer clsTrans = TransformerFactory.newInstance().newTransformer();

                clsTrans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
                clsTrans.setOutputProperty(OutputKeys.METHOD, "xml");
                clsTrans.setOutputProperty(OutputKeys.INDENT, "yes");
                clsTrans.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

                clsTrans.transform(new DOMSource(doc), new StreamResult(clsOutput));

                String electric = clsOutput.toString();

                JSONObject jsonObject = XML.toJSONObject(electric);

                JSONObject jsonResponse = (JSONObject) jsonObject.get("response");
                JSONObject jsonBody = (JSONObject) jsonResponse.get("body");
                JSONObject jsonItems = (JSONObject) jsonBody.get("items");
                JSONArray jsonItem = (JSONArray) jsonItems.get("item");

                ArrayList<Object> electricInfo = new ArrayList<Object>();

                for (int z = 0; z < jsonItem.length(); z++) {
                    Map map = new HashMap<String, String>();
                    JSONObject charging = (JSONObject) jsonItem.get(z);
                    map.put("statNm", charging.get("statNm"));
                    map.put("statId", charging.get("statId"));
                    map.put("chgerId", charging.get("chgerId"));
                    map.put("chgerType", charging.get("chgerType"));
                    map.put("addr", charging.get("addr"));
                    map.put("location", 0);
                    map.put("lat", charging.get("lat"));
                    map.put("lng", charging.get("lng"));
                    map.put("useTime", charging.get("useTime"));
                    map.put("busiId", charging.get("busiId"));
                    map.put("bnm", charging.get("bnm"));
                    map.put("busiCall", charging.get("busiCall"));
                    map.put("stat", charging.get("stat"));
                    map.put("statUpdDt", charging.get("statUpdDt"));
                    map.put("lastTsdt", charging.get("lastTsdt"));
                    map.put("lastTedt", charging.get("lastTedt"));
                    map.put("nowTsdt", charging.get("nowTsdt"));
                    map.put("powerType", charging.get("powerType"));
                    map.put("output", charging.get("output"));
                    map.put("method", charging.get("method"));
                    map.put("zcode", charging.get("zcode"));
                    map.put("parkingFree", charging.get("parkingFree"));
                    map.put("note", charging.get("note"));
                    map.put("limitYn", charging.get("limitYn"));
                    map.put("limitDetail", charging.get("limitDetail"));
                    map.put("delYn", charging.get("delYn"));
                    map.put("delDetail", charging.get("delDetail"));
                    electricInfo.add(map);
                }

                apiDao.insertInfo(electricInfo);

            } catch (ParserConfigurationException e) {
                e.printStackTrace();
            } catch (TransformerException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (SAXException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}
