// Analytics Service - Fetch data from Supabase
import { supabase } from './supabase';
import type { CallMetric, DailyCallMetric, AnalyticsSummary, ChartDataPoint } from './types';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

export class AnalyticsService {
  /**
   * Get analytics summary for date range
   */
  static async getAnalyticsSummary(
    startDate?: Date,
    endDate?: Date
  ): Promise<AnalyticsSummary> {
    try {
      const start = startDate || subDays(new Date(), 30);
      const end = endDate || new Date();

      const { data, error } = await supabase
        .from('call_metrics')
        .select('*')
        .gte('created_at', startOfDay(start).toISOString())
        .lte('created_at', endOfDay(end).toISOString());

      if (error) throw error;

      const metrics = data as CallMetric[];
      
      const totalCalls = metrics.length;
      const totalPickups = metrics.filter(m => m.pickup_status === 'picked_up').length;
      const totalAppointments = metrics.filter(m => m.appointment_booked).length;
      const avgDuration = metrics.reduce((sum, m) => sum + m.call_duration, 0) / totalCalls || 0;
      const avgSentiment = metrics.reduce((sum, m) => sum + m.sentiment_score, 0) / totalCalls || 0;
      const avgConfidence = metrics.reduce((sum, m) => sum + m.confidence_score, 0) / totalCalls || 0;

      return {
        totalCalls,
        totalPickups,
        totalAppointments,
        avgDuration: Math.round(avgDuration),
        avgSentiment: Math.round(avgSentiment * 100) / 100,
        avgConfidence: Math.round(avgConfidence * 100) / 100,
        successRate: totalCalls > 0 ? Math.round((totalAppointments / totalCalls) * 100) : 0,
        pickupRate: totalCalls > 0 ? Math.round((totalPickups / totalCalls) * 100) : 0,
        appointmentRate: totalPickups > 0 ? Math.round((totalAppointments / totalPickups) * 100) : 0,
      };
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      throw error;
    }
  }

  /**
   * Get chart data for trends visualization
   */
  static async getChartData(
    startDate?: Date,
    endDate?: Date
  ): Promise<ChartDataPoint[]> {
    try {
      const start = startDate || subDays(new Date(), 30);
      const end = endDate || new Date();

      const { data, error } = await supabase
        .from('daily_call_metrics')
        .select('*')
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      if (error) throw error;

      const metrics = data as DailyCallMetric[];

      return metrics.map(m => ({
        date: format(new Date(m.date), 'MMM dd'),
        calls: m.total_calls,
        pickups: m.total_pickups,
        appointments: m.total_appointments,
        sentiment: Math.round(m.avg_sentiment_score * 100) / 100,
      }));
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }

  /**
   * Get recent call metrics
   */
  static async getRecentCalls(limit: number = 10): Promise<CallMetric[]> {
    try {
      const { data, error } = await supabase
        .from('call_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data as CallMetric[];
    } catch (error) {
      console.error('Error fetching recent calls:', error);
      throw error;
    }
  }

  /**
   * Get calls by company
   */
  static async getCallsByCompany(companyName: string): Promise<CallMetric[]> {
    try {
      const { data, error } = await supabase
        .from('call_metrics')
        .select('*')
        .ilike('company_name', `%${companyName}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data as CallMetric[];
    } catch (error) {
      console.error('Error fetching calls by company:', error);
      throw error;
    }
  }
}
