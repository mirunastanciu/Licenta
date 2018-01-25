package com.test.app.ticket;

import java.sql.Date;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.test.app.account.AccountService;
import com.test.app.client.Client;
import com.test.app.client.ClientService;
import com.test.app.employee.Employee;
import com.test.app.employee.EmployeeService;
import com.test.app.projecttype.ProjectTypeService;
import com.test.app.specialisation.SpecialisationService;
import com.test.app.ticketstatus.TicketStatusService;

@RestController
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@Autowired
	private ProjectTypeService projectTypetService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private TicketStatusService ticketStatusService;

	@Autowired
	private ClientService clientService;

	@Autowired
	private SpecialisationService specialisationService;

	@Autowired
	private AccountService accountService;

	@RequestMapping(path = "/ticketsToDo", method = RequestMethod.GET)
	List<TicketDetails> getAllTicketsToDo() {
		List<Ticket> ttodo = new ArrayList<>();
		List<TicketDetails> td = new ArrayList<>();
		

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		//System.out.println(username);
		int acctype = accountService.getAccByUsrename(username).getIdaccounttype();
		System.out.println(username);
		
		if (acctype == 1) {
			
			ttodo = ticketService.getTicketsToDo();
			
		} else if (acctype == 2) {
			
			int idcl = clientService.getIdClByUsername(username);
			ttodo = ticketService.getTicketsToDoByIdClient(idcl);
			
		} else if (acctype == 3){
			
			int idemp = employeeService.getIdEmpByUsername(username);
			int empspecialisationid = employeeService.getSpecialisationByIdEmp(idemp);
			ttodo = ticketService.getTicketsToDoByIdEmp(empspecialisationid);
		}

		for (int i = 0; i < ttodo.size(); i++) {

				 TicketDetails tkd = new TicketDetails();
				tkd.setIdticket(ttodo.get(i).getId());
				tkd.setDescription(ttodo.get(i).getDescription());
				tkd.setProjecttypename(projectTypetService.getProjectTypeById(
						ttodo.get(i).getProjcttype()).getProjtypename());
				tkd.setCreationdate(ttodo.get(i).getCreationdate());  //Duedate(ttodo.get(i).getDuedate());
				tkd.setStatus(ticketStatusService.getTicketStatusById(
						ttodo.get(i).getIdstatus()).getStatusname());
				td.add(tkd);
		}
		

		return td;
	}



	@RequestMapping(path = "/ticketsInProgress", method = RequestMethod.GET)
	public List<TicketDetails> getAllTicketsAssigned() {
		List<Ticket> tInProgress = new ArrayList<>();
		List<TicketDetails> td = new ArrayList<>();
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		System.out.println(username);
		int acctype = accountService.getAccByUsrename(username).getIdaccounttype();

		if (acctype == 1) {
			tInProgress = ticketService.getTicketsInProgress();
			
		} else if (acctype == 2) {
			int idcl = clientService.getIdClByUsername(username);
			tInProgress = ticketService.getTicketsInProgressByIdClient(idcl);
			
		} else if (acctype == 3){
			int idemp = employeeService.getIdEmpByUsername(username);
			tInProgress = ticketService.getTicketsAssignedByIdEmp(idemp);
		}

		for (int i = 0; i < tInProgress.size(); i++) {

				TicketDetails tkd = new TicketDetails();
				tkd.setIdticket(tInProgress.get(i).getId());
				tkd.setDescription(tInProgress.get(i).getDescription());
				tkd.setProjecttypename(projectTypetService.getProjectTypeById(
						tInProgress.get(i).getProjcttype()).getProjtypename());
				tkd.setDuedate(tInProgress.get(i).getDuedate());
				tkd.setStatus(ticketStatusService.getTicketStatusById(
						tInProgress.get(i).getIdstatus()).getStatusname());
				td.add(tkd);
			}
		

		return td;
	}

	
	@RequestMapping(path = "/ticketsDone", method = RequestMethod.GET)
	public List<TicketDetails> getAllTicketsDone() {
		List<Ticket> tDone = new ArrayList<>();
		List<TicketDetails> td = new ArrayList<>();
		

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		System.out.println(username);
		int acctype = accountService.getAccByUsrename(username).getIdaccounttype();

		if (acctype == 1) {
			
				tDone = ticketService.getTicketsDone();

		} else if (acctype == 2) {
			int idcl = clientService.getIdClByUsername(username);
			tDone = ticketService.getTicketsDoneByIdClient(idcl);			

		}
		
		for (int i = 0; i < tDone.size(); i++) {

			TicketDetails tkd = new TicketDetails();
			tkd.setIdticket(tDone.get(i).getId());
			tkd.setDescription(tDone.get(i).getDescription());
			tkd.setProjecttypename(projectTypetService.getProjectTypeById(
					tDone.get(i).getProjcttype()).getProjtypename());
			tkd.setDuedate(tDone.get(i).getDuedate());
			tkd.setStatus(ticketStatusService.getTicketStatusById(tDone.get(i).getIdstatus()).getStatusname());
			td.add(tkd);
		}

		return td;
	}

	

	@RequestMapping(path = "/addTicket", method = RequestMethod.POST)
	public String addTicket(@RequestParam("projecttype") String projecttype,
			@RequestParam("description") String description,
			@RequestParam("assignpers") String assignpers,
			@RequestParam("duedate") String duedate) {

		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		String username = authentication.getName();

		Ticket t = new Ticket();
		t.setDescription(description);
		t.setProjcttype(projectTypetService.getIdProjectTypeByName(projecttype));
		if (assignpers != "") {
			t.setIdemployee(getIdEmployeeByName(assignpers));
		} else {
			t.setIdemployee(0);
		}

		java.sql.Date parseDate = java.sql.Date.valueOf(duedate);
		t.setDuedate(parseDate);
		if (accountService.getAccountTypeByUsername(username) == 2) {
			t.setIdclient(clientService.getIdClByUsername(username));
		} else if (accountService.getAccountTypeByUsername(username) == 1
				|| accountService.getAccountTypeByUsername(username) == 3) {
			t.setIdclient(0);
		} else {
			t.setIdclient(clientService.getIdClByUsername(username));
		}

		t.setCreationdate(Date.valueOf(LocalDate.now()));
		t.setIdstatus(1);// TO DO

		ticketService.addTicket(t);

		String response = "/startPage";
		return response;

	}

	@RequestMapping(value = "/updateTicket", method = RequestMethod.POST)
	public void updateTicket(
			@RequestParam(value = "idTicket") int idTicket,
			@RequestParam(value = "projecttype") String projecttype,
			@RequestParam(value = "status") String status,
			@RequestParam(value = "projectdescription") String projectdescription,
			@RequestParam(value = "duedate") String duedate,
			@RequestParam(value = "startdate") String startdate,
			@RequestParam(value = "finishdate") String finishdate,
			@RequestParam(value = "employeename") String employeename)
			throws ParseException {
		Ticket t = ticketService.getTicketById(idTicket);
		t.setId(idTicket);
		t.setDescription(projectdescription);
		t.setProjcttype(projectTypetService.getIdProjectTypeByName(projecttype));
		t.setIdemployee(getIdEmployeeByName(employeename));

		if (duedate.equals("") == false) {
			java.sql.Date parseDate = java.sql.Date.valueOf(duedate);
			t.setDuedate(parseDate);
		}

		if (startdate.equals("") == false) {
			java.sql.Date parseDate = java.sql.Date.valueOf(startdate);
			t.setStartdate(parseDate);
		}

		if (finishdate.equals("") == false) {
			java.sql.Date parseDate = java.sql.Date.valueOf(finishdate);
			t.setFinishdate(parseDate);
		}

		t.setIdstatus(ticketStatusService.getStatusIdByName(status));
		ticketService.addTicket(t);

	}

	public int getIdEmployeeByName(String a) {
		List<Employee> l = employeeService.getAllEmployies();
		for (int i = 0; i < l.size(); i++) {
			String fl = l.get(i).getFirstname() + " " + l.get(i).getLastname();
			if (fl.equals(a)) {
				return l.get(i).getId();
			}
		}
		return 0;
	}

	@ResponseBody
	@RequestMapping(value = "/getDetailsByIdTicket", method = RequestMethod.POST)
	public TicketDetails getDetailsByIdTicket(
			@RequestParam(value = "idTicket") int id) {

		Ticket tk = ticketService.getTicketById(id);
		TicketDetails tkd = new TicketDetails();
		tkd.setIdticket(tk.getId());
		tkd.setProjecttypename(projectTypetService.getProjectTypeById(
				tk.getProjcttype()).getProjtypename());
		tkd.setStatus(ticketStatusService.getTicketStatusById(tk.getIdstatus())
				.getStatusname());

		if (tk.getIdemployee() != 0) {
			String employeeName = employeeService.getEmployeeById(
					tk.getIdemployee()).getFirstname()
					+ " "
					+ employeeService.getEmployeeById(tk.getIdemployee())
							.getLastname();
			tkd.setEmployeename(employeeName);
			tkd.setEmployeeemail(employeeService.getEmployeeById(
					tk.getIdemployee()).getEmail());
			tkd.setEmployeespecialisation(specialisationService
					.getSpecialisationById(
							(employeeService.getEmployeeById(tk.getIdemployee()))
									.getIdspecialisation()).getName());
		} else {
			tkd.setEmployeename("Unassigned");
			tkd.setEmployeeemail("");
			tkd.setEmployeespecialisation("");
		}
		if (tk.getIdclient() != 0) {
			String clientName = clientService.getClientById(tk.getIdclient())
					.getFirstname()
					+ " "
					+ clientService.getClientById(tk.getIdclient())
							.getLastname();
			tkd.setClientname(clientName);
			tkd.setClientemail(clientService.getClientById(tk.getIdclient())
					.getEmail());
		} else {
			tkd.setClientname("System");
			tkd.setClientemail("");
		}

		tkd.setCreationdate(tk.getCreationdate());
		tkd.setDuedate(tk.getDuedate());
		tkd.setStartdate(tk.getStartdate());
		tkd.setFinishdate(tk.getFinishdate());
		tkd.setDescription(tk.getDescription());
		return tkd;

	}

	@RequestMapping(value = "/deleteTicket", method = RequestMethod.POST)
	public void deleteTicket(@RequestParam(value = "idTicket") int id) {

		ticketService.delete(ticketService.getTicketById(id));
	}

	@RequestMapping(value = "/getIdTByIdCl", method = RequestMethod.POST)
	public ArrayList<Integer> getIdTByIdCl(
			@RequestParam(value = "clientname") String name) {
		int idCl = 0;
		ArrayList<Client> cl = clientService.getAllClients();
		for (int i = 0; i < cl.size(); i++) {
			String fullname = cl.get(i).getFirstname() + " "
					+ cl.get(i).getLastname();
			if (fullname.equals(name)) {
				idCl = cl.get(i).getId();
			}
		}

		return ticketService.getTicketsIdByIdClient(idCl);

	}

	@RequestMapping(value = "/assignToMe", method = RequestMethod.POST)
	public void assignToMe(
	@RequestParam(value = "idTicket") int idTicket) {

		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		String username = authentication.getName();

		Ticket t = ticketService.getTicketById(idTicket);
		int emp = employeeService.getIdEmpByUsername(username);

		t.setIdemployee(emp);

		ticketService.addTicket(t);
	}

	@RequestMapping(value = "/unassign", method = RequestMethod.POST)
	public void unassign(@RequestParam(value = "idTicket") int idTicket) {

		Ticket t = ticketService.getTicketById(idTicket);
		t.setIdemployee(0);

		ticketService.addTicket(t);
	}

}
