// reportWebVitals.test.js
import reportWebVitals from './reportWebVitals';

// Mock the web-vitals module
jest.mock('web-vitals', () => ({
	getCLS: jest.fn(),
	getFID: jest.fn(),
	getFCP: jest.fn(),
	getLCP: jest.fn(),
	getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
	let mockGetCLS;
	let mockGetFID;
	let mockGetFCP;
	let mockGetLCP;
	let mockGetTTFB;

	beforeEach(() => {
		// Import the mocked methods for each vitals metric
		const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
		mockGetCLS = getCLS;
		mockGetFID = getFID;
		mockGetFCP = getFCP;
		mockGetLCP = getLCP;
		mockGetTTFB = getTTFB;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('calls the performance metrics when onPerfEntry is a function', async () => {
		const mockPerfEntry = jest.fn();

		// Call the function with a mock performance entry function
		await reportWebVitals(mockPerfEntry);

		// Check that each web-vitals function was called with mockPerfEntry
		expect(mockGetCLS).toHaveBeenCalledWith(mockPerfEntry);
		expect(mockGetFID).toHaveBeenCalledWith(mockPerfEntry);
		expect(mockGetFCP).toHaveBeenCalledWith(mockPerfEntry);
		expect(mockGetLCP).toHaveBeenCalledWith(mockPerfEntry);
		expect(mockGetTTFB).toHaveBeenCalledWith(mockPerfEntry);
	});

	it('does not call web vitals if onPerfEntry is not a function', async () => {
		// Call the function with an undefined parameter
		await reportWebVitals();

		// Ensure that none of the web-vitals functions were called
		expect(mockGetCLS).not.toHaveBeenCalled();
		expect(mockGetFID).not.toHaveBeenCalled();
		expect(mockGetFCP).not.toHaveBeenCalled();
		expect(mockGetLCP).not.toHaveBeenCalled();
		expect(mockGetTTFB).not.toHaveBeenCalled();
	});
});
