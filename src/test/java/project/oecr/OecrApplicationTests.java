package project.oecr;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.oecr.main.map.dao.MapDao;

@SpringBootTest
class OecrApplicationTests {
	@Autowired
	MapDao dao;

	@Test
	void contextLoads() {
		System.out.println(dao.rangeLevel(null));

	}

}
