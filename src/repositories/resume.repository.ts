import { pool } from "../config/db";

export const saveResumeAnalysis = async (
  id: string,
  fileName: string,
  atsScore: number,
  analysis: object,
) => {
  try {
    const query = `
                  INSERT INTO resume_analysis
                      (
                        id,
                        file_name,
                        ats_score,
                        analysis
                      )
                      VALUES ($1, $2, $3, $4)
                      RETURNING *
                    `;

    await pool.query(query, [id, fileName, atsScore, JSON.stringify(analysis)]);
  } catch (error) {
    console.error("Error saving resume analysis:", error);
    throw new Error("Failed to save resume analysis");
  }
};

export const getResumeAnalysisById = async (id: string) => {
  try {
    const query = `
    SELECT *
    FROM resume_analysis
    WHERE id = $1
  `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching resume analysis by ID:", error);
    throw new Error("Failed to fetch resume analysis");
  }
};
